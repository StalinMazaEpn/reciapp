import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { TourPage } from '../pages/tour1/tour1';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tour:any=false;
  ruta:any="";
  rootPage:any;
  //rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    if (this.tour) {
      this.tour=false;
      this.rootPage=TourPage;
    }else{
      this.rootPage=TabsPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
  }
  

} 

