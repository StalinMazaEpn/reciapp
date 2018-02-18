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
  	let i =0;
  	while (i<5){
  		setTimeout(()=>this.ruta,1000);
  		i++;
  	}

    this.rutas();

  } 

  rutas(){
  	if (this.tour) {
	  	this.tour=false;
	  	return this.ruta=this.navCtrl.push(Tour1Page);
  	}else{
  		if (this.login) {
  			return this.ruta=this.navCtrl.push(DashboardPage);
  		}else{
  			return this.ruta=this.navCtrl.push(InicioPage);
  		}
  	}
  }

  
}
