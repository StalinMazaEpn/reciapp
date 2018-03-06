import { TabsPage } from './../tabs/tabs';
 import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Tour1Page } from '../tour1/tour1';
import { InicioPage } from '../inicio/inicio';
import { DashboardPage } from '../dashboard/dashboard';

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
      this.setFirstTime(); // And set the localstorage firsTime.
      this.ruta = Tour1Page;
    }else{ // if exists go to the TabsPage
      this.ruta = TabsPage;
    }
    setTimeout(()=>{
      this.navCtrl.push(this.ruta) 
    },1000);
  }

  getFirstTime():string {
    return localStorage.getItem('firstTime');
  }

  setFirstTime():void {
    localStorage.setItem('firstTime','true');
  }
}