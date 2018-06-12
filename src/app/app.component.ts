import { Component, ViewChild  } from '@angular/core';
import { Nav, Platform, App, AlertController,LoadingController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { TourPage } from '../pages/tour/tour';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  platform: Platform;
  isAuthenticated:boolean;
  optionsMenu:any;

  optionWithSession:any=[
    {title:'Perfil',component:null},
    {title:'Tour',component:TourPage},
    {title:'Cerrar Sesión',component:'cerrar'},
  ];

  optionWithOutSession:any=[
    {title:'Perfil',component:null},
    {title:'Tour',component:TourPage},
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public nativeStorage: NativeStorage, public app: App,
   private alertCtrl: AlertController, public afAuth:AngularFireAuth,public loadingCtrl:LoadingController, public menuCtrl: MenuController) {
    platform.ready().then(() => {

      this.platform = platform;
      moment.locale('es');

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

      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){ //Can we go back?
          nav.pop();
        }else{
          this.exitApp(); //Exit from app with confirmation
        }
      });
    });

    this.afAuth.authState.subscribe(data=>{
      if(data && data.uid){
        this.optionsMenu=this.optionWithSession;
        //console.log('SESSION OPTION MENU');
      }else{
        //console.log('WITHOUT SESSION OPTION MENU');
        this.optionsMenu=this.optionWithOutSession;
      }
    });
  }

  isTourDone(): boolean{
    if(localStorage.getItem('tourDone') != null){
      return true
    }else{
      return false;
    }
  }

  exitApp() {
    let alert = this.alertCtrl.create({
      title: 'Salir',
      message: 'Desea salir de la App?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
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

  logout(){
    firebase.auth().signOut();
    localStorage.removeItem('userData');
    //Toast loading while logout user session
    this.redirectLogin();
    this.nav.setRoot(TabsPage);
  }

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
      this.menuCtrl.close();
      this.nav.push(option);
    }
  }

}

