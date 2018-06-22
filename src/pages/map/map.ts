import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Platform, AlertController, Modal, ModalOptions } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import { RecicladorPage } from "../reciclador/reciclador";
import { RecyclerFormPage } from "../recycler-form/recycler-form";
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LoginPage } from '../login/login';
import { AuthenticationService } from "../../services/authenticationService";
import { AngularFireAuth } from 'angularfire2/auth';
import { CallNumber } from '@ionic-native/call-number';
import { ModalPage } from '../modal/modal';
import { ExchangePage } from '../exchange/exchange';
import { CouponModalPage } from '../couponModal/couponModal';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  lat: any;
  lng: any;

  latView: any;
  lngView: any;

  zoom: any;

  showMarkers: boolean;

  // values by default
  latViewDef: any = -0.184713;
  lngViewDef: any = -78.484771;
  zoomDef: any = 10;

  recyclers:any;
  recyclersFavorites:any;

  isAuthenticated:boolean;
  user:any;
  recyclerm:string;

  partnerList:any;

  //exchanges
  exchangeList;
  userPts;
  userName;
  userData;
  //objExchange:any;

  recyclersView: boolean=true;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,public recyclerSrv: ReciappService,
   public modalCtrl: ModalController, public authService:AuthenticationService,public toastCtrl:ToastController, private afAuth:AngularFireAuth, private locationAccuracy: LocationAccuracy, public callNumber: CallNumber,
   private diagnostic: Diagnostic, private platform: Platform, public partnerSrv: ReciappService, public userSrv: ReciappService,
   private alertCtrl: AlertController) {
    this.isAuthenticated=this.authService.isAuthenticated();
    this.getMyLocation();
    this.getRecyclers();
    this.valuesByDefault();
    this.getPartners();
    this.showMarkers= true;

    this.userSrv.getExchangeList().subscribe((data)=>{
  		this.exchangeList=data;
  	});
    
    this.userSrv.getUser(this.authService.getCurrentUser().uid).subscribe((data)=>{
      this.userData=data;
      this.userPts=data['points']['total'];
      this.userName=data['name'];
    });

    if(this.isAuthenticated) {
      this.user = this.recyclerSrv.getUser(this.authService.getCurrentUser().uid);
      
    }
    if (this.platform.is('ios')) {
      this.locationAccuracy.canRequest().then(
        (canRequest: boolean) => {
          if(canRequest) {
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                this.verifyGps();
                this.getMyLocation();
              },
              error => {
                this.valuesByDefault();
              }
            );
          }
      });
    } else if (this.platform.is('android')) {
      this.diagnostic.isGpsLocationEnabled()
      .then((enabled)=>{
        if(enabled){
          this.getMyLocation();
        }else{
          this.presentConfirm("Encender su GPS por favor");
        }
      });
  }
}

  ionViewDidLoad() {
    this.recyclerm = "favorite";
    this.isAuthenticated=this.authService.isAuthenticated();
    console.log('ionViewDidLoad ExchangePage');
  }



  ionViewWillEnter(){
    this.recyclerm = "favorite";
    this.isAuthenticated=this.authService.isAuthenticated();
    this.afAuth.authState.subscribe(
      data => {
        if(data && data.uid){
          this.recyclersFavorites = this.recyclerSrv.getFavoritiesRecycler(data.uid)
          .map((recyclerId)=>{
            return recyclerId.map(recyclerObj => {
              return this.recyclerSrv.getRecyclerById(recyclerObj.payload.key);
            })
          })
        }
      });
  }

  addRecycler() {
    if (this.isAuthenticated) {
      let modal = this.modalCtrl.create(RecyclerFormPage);
      modal.present();
    }else{
      this.navCtrl.push(LoginPage);
      this.isNotAuthenticated();
    }

  }

  goToRecycler(recycler) {
    this.navCtrl.push(RecicladorPage, {recycler: recycler});
  }
  getRecyclers(){
    this.recyclerSrv.getRecycler()
    .subscribe((resp)=>{
      this.recyclers = resp;
    });

  }


  getMyLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.latView = resp.coords.latitude;
      this.lngView = resp.coords.longitude;
      this.zoom =  16;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  centerChange(LatLongChange){
    this.latView = null;
    this.lngView = null;
  }

  zoomChange(ZoomChange){
    this.zoom = ZoomChange;
  }

  getViewLocation(){
    if(this.lat ==  null && this.lng == null){
      this.getMyLocation();
    }else{
      this.latView = this.lat;
      this.lngView = this.lng;
    }
  }

  valuesByDefault(){
    this.latView = this.latViewDef;
    this.lngView = this.lngViewDef;
    this.zoom =  this.zoomDef;
  }

  isNotAuthenticated() {
    let toast = this.toastCtrl.create({
      message: 'Debes iniciar sesión para registrar un nuevo reciclador.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  verifyGps(){
    this.diagnostic.isLocationAuthorized()
    .then((appAutorized)=>{
      if(appAutorized){
        this.diagnostic.isLocationEnabled()
        .then((enabled)=>{
          if(enabled){
            this.getMyLocation();
          }else{
            this.presentConfirm("Encender su GPS por favor");
          }
        })
      }else{
        this.diagnostic.requestLocationAuthorization("always")
        .then(()=>{
          this.getMyLocation();
        })
      }
    })
  }

  presentConfirm(message) {
    let alert = this.alertCtrl.create({
      title: 'Ubicación',
      message: message
    });
    alert.present();
}

/*openModal() {

  const myModalOptions : ModalOptions = {
    enableBackdropDismiss: false
  };

  const myData = {
    name: 'Paul',
    occupation: 'Developer'
  };
  const myModal : Modal = this.modalCtrl.create( 'ModalPage', { data: myData }, myModalOptions );
  myModal.present();
  myModal.onDidDismiss( ( data ) => {
    console.log( data );

  } );
}*/

dismiss() {
  this.navCtrl.pop();
}

changePins(values){
  console.log(values);
  this.recyclersView=values;
}

exchangeModal(objExchange){
  //console.log('BEFORE',objExchange);
  let modal = this.modalCtrl.create(ModalPage,{objectExchange:objExchange, userData:this.userData});
  modal.present();
  console.log(objExchange);
}

doCallNumber(phoneNumber: string) {
  let alert = this.alertCtrl.create({
    title: 'Llamada',
    message: 'Desea realizar la llamada?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Llamar',
        handler: () => {
          this.callNumber.callNumber(phoneNumber, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
        }
      }
    ]
  });
  alert.present();
}

showAlert() {
  let alert = this.alertCtrl.create({
    title: 'New Friend!',
    subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
    buttons: ['OK']
  });
  alert.present();
}

getPartners(){
  this.partnerSrv.getPartner().subscribe((data)=>{
    this.partnerList=data;
  });
}

showHideMarkers(){
  if(this.showMarkers){
    this.showMarkers=false
  }else{
    this.showMarkers=true
  }
}

}
