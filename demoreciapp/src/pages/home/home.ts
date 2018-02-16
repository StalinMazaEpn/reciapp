 import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Tour1Page } from '../tour1/tour1'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  Avanzar():void{
  	this.navCtrl.push(Tour1Page);
  }

  
}
