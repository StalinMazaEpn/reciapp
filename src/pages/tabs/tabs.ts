import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import {DashboardPage} from '../dashboard/dashboard';
import {EntregaPage} from '../entrega/entrega';
import { TourPage } from '../tour/tour';
import { SocialNetworksPage } from '../social-networks/social-networks';
import {DeliveryPage} from '../delivery/delivery';

import * as firebase from 'firebase/app'
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = DashboardPage;
  tab2Root = DeliveryPage;
  tab3Root = EntregaPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  userProfile() {
    //this.navCtrl.push();
  }
  socialNetworks() {
    this.navCtrl.push(SocialNetworksPage);
  }
  goToTour(){
    this.navCtrl.push(TourPage); 
  }
  aboutUs() {
    //this.navCtrl.push();
  }

  logout(){
    console.log('cerrar');
    //localStorage.removeItem('isLog');
    firebase.auth().signOut();
    this.redirectLogin();
    setTimeout(()=>{this.navCtrl.setRoot(TabsPage)},3000);
  }

  redirectLogin() {
    let loader = this.loadingCtrl.create({
      content: "Cerrando Sesión...",
      duration: 2600
    });
    loader.present();
  }
}
