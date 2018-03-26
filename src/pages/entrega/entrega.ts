import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { ReciappService } from './../../services/reciapp.service';
import {RecicladorPage} from "../reciclador/reciclador";
import { RecyclerFormPage } from "../recycler-form/recycler-form";

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-entrega',
  templateUrl: 'entrega.html',
})
export class EntregaPage {
  isLog:boolean=false;

  lat: any;
  lng: any;
  zoom: any = 16;

  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
   public recyclerSrv: ReciappService,public modalCtrl: ModalController, public afAuth:AngularFireAuth) {
    this.getMyLocation();
    this.getRecyclers();
    this.afAuth.authState.subscribe(
      data => {
        if (data && data.uid && data.email) {
          this.isLog=true;
        }else{
          this.isLog=false;
        }
      });
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
