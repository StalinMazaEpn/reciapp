import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { CategoriaPage } from '../categoria/categoria';
import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import {RecicladorPage} from "../reciclador/reciclador";

@IonicPage()
@Component({
  selector: 'page-entrega',
  templateUrl: 'entrega.html',
})
export class EntregaPage {

  lat: any;
  lng: any;
  zoom: any = 16;

  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public recyclerSrv: ReciappService) {
    this.getMyLocation();
    this.getRecyclers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregaPage');
  }

  Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }

  Separa():void{
  	this.navCtrl.push(CategoriaPage);
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
