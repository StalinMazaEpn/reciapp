import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RecicladorPage } from '../reciclador/reciclador';
import { EntregaPage } from '../entrega/entrega';
import { CategoriaPage } from '../categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  /*Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }*/

  Separa():void{
  	this.navCtrl.push(CategoriaPage);
  }

  Entrega():void{
  	this.navCtrl.push(EntregaPage);
  }

  verReciclador(){
  	this.navCtrl.push(RecicladorPage);
  }
}
