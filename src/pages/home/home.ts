import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TourPage } from './../tour/tour';
import { TabsPage } from './../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tour:any=false;
  ruta:any="";
  login:any=true;

  constructor(public navCtrl: NavController) { 
    /*if (this.tour) {
        this.tour=false;
        this.ruta=Tour1Page;
      }else{
        if (this.login) {
          this.ruta=DashboardPage;
        }else{
          this.ruta=InicioPage;
        }
      }*/

    // verify if exits localstorage firsTime
    if (this.getFirstTime() == null) { // if don´t exists go to the Tour
      this.ruta = TourPage;
    }else{ // if exists go to the TabsPage
      this.ruta = TabsPage;
    } 
    setTimeout(()=>{
      this.navCtrl.setRoot(this.ruta) 
    },1000);
  }

  getFirstTime():string {
    return localStorage.getItem('tourDone');
  }
}