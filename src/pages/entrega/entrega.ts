import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ToastController  } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import {RecicladorPage} from "../reciclador/reciclador";
import { RecyclerFormPage } from "../recycler-form/recycler-form";
import { LoginPage } from '../login/login';


import {AuthenticationService} from "../../services/authenticationService";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-entrega',
  templateUrl: 'entrega.html',
})
export class EntregaPage {
  lat: any;
  lng: any;

  latView: any;
  lngView: any;

  zoom: any;

  // values by default 
  latViewDef: any = -0.184713; 
  lngViewDef: any = -78.484771;
  zoomDef: any = 10;

  recyclers:any;
  recyclersFavorites:any;

  isAuthenticated:boolean;
  isLog:boolean;
  user:any;
  recyclerm:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,public recyclerSrv: ReciappService,
   public modalCtrl: ModalController, public authService:AuthenticationService,public toastCtrl:ToastController, private afAuth:AngularFireAuth) {
    this.isAuthenticated=this.authService.isAuthenticated();
    this.getMyLocation();
    this.getRecyclers();
    this.valuesByDefault();
    if(this.isAuthenticated) {
      this.user = this.recyclerSrv.getUser(this.authService.getCurrentUser().uid);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregaPage');
    this.recyclerm = "favorite";
    this.isAuthenticated=this.authService.isAuthenticated();
  }

  ionViewWillEnter(){
    console.log("Entrara");
    this.recyclerm = "favorite";
    this.isAuthenticated=this.authService.isAuthenticated();
    this.afAuth.authState.subscribe(
      data => {
        if(data && data.uid){
          console.log("UID", data.uid);
          this.recyclersFavorites = this.recyclerSrv.getFavoritiesRecycler(data.uid)
          .map((recyclerId)=>{
            return recyclerId.map(recyclerObj => {
              return this.recyclerSrv.getRecyclerById(recyclerObj.payload.key);
            })
          })
          console.log("RECICLADORES", this.recyclers);
        }
      });
  }

  addRecycler() {
    console.log('Logueado',this.isAuthenticated);

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
      console.log(this.recyclers);
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
    this.latView = LatLongChange.lat;
    this.lngView = LatLongChange.lng;
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
}
