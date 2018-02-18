import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { CategoriaPage } from '../categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-entrega',
  templateUrl: 'entrega.html',
})
export class EntregaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntregaPage');
  }

  Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }

  Separa():void{
  	this.navCtrl.push(CategoriaPage);
  }

}
