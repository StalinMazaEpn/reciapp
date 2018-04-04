import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public nativeStorage: NativeStorage) {
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

