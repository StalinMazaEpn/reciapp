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
  isLog:boolean;

  lat: any;
  lng: any;
  zoom: any = 16;

  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public recyclerSrv: ReciappService,public modalCtrl: ModalController) {
    this.getMyLocation();
    this.getRecyclers();

    this.isLog=window.localStorage['isLog'];
    console.log(this.isLog);
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
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
