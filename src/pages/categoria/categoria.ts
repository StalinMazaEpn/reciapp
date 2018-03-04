import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';

import { EntregaPage } from '../entrega/entrega';
import { DashboardPage } from '../dashboard/dashboard';
import { DetallePage } from '../detalle/detalle';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  
  categories:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriesSrv: ReciappService) {

    this.categories=categoriesSrv.getCategory();
    //console.log(this.categories);
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

  goSubcategory(id):void{
    //console.log(id);
  	this.navCtrl.push(DetallePage,{id:id});
  }

}
