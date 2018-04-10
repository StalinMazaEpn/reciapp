import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { TourPage } from '../pages/tour/tour';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  platform: Platform;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public nativeStorage: NativeStorage, public app: App, private alertCtrl: AlertController) {
    platform.ready().then(() => {

      this.platform = platform;

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

}

