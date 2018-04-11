import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController  } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import {RecicladorPage} from "../reciclador/reciclador";
import { RecyclerFormPage } from "../recycler-form/recycler-form";
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
   public recyclerSrv: ReciappService,public modalCtrl: ModalController, private locationAccuracy: LocationAccuracy, 
   private diagnostic: Diagnostic, private platform: Platform, 
   private alertCtrl: AlertController) {
    this.getMyLocation();
    this.getRecyclers();
    this.valuesByDefault();

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
    console.log('ionViewDidLoad EntregaPage');
  }

  addRecycler() {
    let modal = this.modalCtrl.create(RecyclerFormPage);
    modal.present();
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

  presentConfirm(message) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: message
    });
    alert.present();
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


}
