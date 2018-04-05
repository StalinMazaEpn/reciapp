import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { TourPage } from '../pages/tour/tour';
import { SocialNetworksPage } from '../pages/social-networks/social-networks';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  isAuthenticated:any;

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

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public nativeStorage: NativeStorage, 
    public loadingCtrl:LoadingController,public afAuth:AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      if(this.isTourDone()){
        this.rootPage = TabsPage;
        splashScreen.hide();
      }else{
        this.rootPage = TourPage;
        splashScreen.hide();
      }
      
    });

    this.afAuth.authState.subscribe(
      data => {
        if (data && data.uid) {
          this.optionsMenu=this.optionWithSession;
        }else{
          this.optionsMenu=this.optionWithoutSession;
        }
      });
  }

//function to close/destroy user session
  logout(){
    firebase.auth().signOut();
    //Toast loading while logout user session
    this.redirectLogin();
    this.nav.setRoot(TabsPage);
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
    if (option==="cerrar") {
      this.logout();
    }else{
      this.nav.push(option);  
    }
  }


  isTourDone(): boolean{
    if(localStorage.getItem('tourDone') != null){
      return true
    }else{
      return false;
    }
  }

  /*
  This method will be used in future test with mobiles
  Don`t Erase please
  
  isTourDone(): boolean{
    this.nativeStorage.getItem('tourDone')
    .then(
      () => { return true},
      error => { return false}
    );
  }
  */
}

