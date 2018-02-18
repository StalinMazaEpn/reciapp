import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EntregaPage } from '../entrega/entrega';
import { DashboardPage } from '../dashboard/dashboard';
import { DetallePage } from '../detalle/detalle';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

  Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }

  /*Separa():void{
  	this.navCtrl.push(CategoriaPage);
  }*/

  Entrega():void{
  	this.navCtrl.push(EntregaPage);
  }

  ver():void{
  	this.navCtrl.push(DetallePage);
  }

}
