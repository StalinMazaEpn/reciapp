import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import {DashboardPage} from '../dashboard/dashboard';
import {EntregaPage} from '../entrega/entrega';
import {CategoriaPage} from '../categoria/categoria';
import { TourPage } from '../tour/tour';
import { SocialNetworksPage } from '../social-networks/social-networks';

import { LoginPage } from '../login/login';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = DashboardPage;
  tab2Root = CategoriaPage;
  tab3Root = EntregaPage;

  optionsMenu:any;

  optionWithSession:any=[
    {title:'Perfil',component:null},
    {title:'Redes Sociales',component:SocialNetworksPage},
    {title:'Tour',component:TourPage},
    {title:'Acerca de...',component:null},
    {title:'Cerrar Sesión',component:'cerrar'},
  ];

  optionWithoutSession:any=[
    {title:'Redes Sociales',component:SocialNetworksPage},
    {title:'Tour',component:TourPage},
    {title:'Acerca de...',component:null},
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, 
    public afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(
      data => {
        if (data && data.uid && data.email) {
          this.optionsMenu=this.optionWithSession;
        }else{
          this.optionsMenu=this.optionWithoutSession;
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }


  //function to close/destroy user session
  logout(){
    //console.log('cerrar');
    firebase.auth().signOut();
    //Toast loading while logout user session
    this.redirectLogin();
    this.navCtrl.push(LoginPage);
  }
  
  //Loading Controller 
  redirectLogin() {
    let loader = this.loadingCtrl.create({
      content: "Cerrando Sesión...",
      dismissOnPageChange:true
    });
    loader.present();
  }

  //Funtion to go an option page
  optionPageMenu(option){
    //console.log(option);
    if (option==="cerrar") {
      this.logout();
    }else{
      this.navCtrl.push(option);  
    }
  }
}
