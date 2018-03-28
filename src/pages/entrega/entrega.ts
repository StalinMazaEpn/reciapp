import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import {RecicladorPage} from "../reciclador/reciclador";
import { RecyclerFormPage } from "../recycler-form/recycler-form";

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
   public recyclerSrv: ReciappService,public modalCtrl: ModalController) {
    this.getMyLocation();
    this.getRecyclers();
    this.valuesByDefault();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregaPage');
  }

  addRecycler() {
    let modal = this.modalCtrl.create(RecyclerFormPage);
    modal.present();
  }

  goToRecycler(id) {
    this.navCtrl.push(RecicladorPage, {id: id});
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


}
