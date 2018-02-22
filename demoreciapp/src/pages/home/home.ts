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
    if (this.tour) {
        this.tour=false;
        this.ruta=Tour1Page;
      }else{
        if (this.login) {
          this.ruta=DashboardPage;
        }else{
          this.ruta=InicioPage;
        }
      }
    setTimeout(()=>{this.navCtrl.push(this.ruta)},1000);
  }
}