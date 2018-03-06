import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Tour1Page } from '../pages/tour1/tour1';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { InicioPage } from '../pages/inicio/inicio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tour:any=true;
  ruta:any="";
  login:any=false;

  rootPage:any;
  //rootPage:any = HomePage;
  //rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    if (this.tour) {
      this.tour=false;
      this.rootPage=Tour1Page;
    }else{
      if (this.login) {
        this.rootPage=TabsPage;
      }else{
        //this.rootPage=DashboardPage;
        this.rootPage=InicioPage;
      }
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
  }

} 

