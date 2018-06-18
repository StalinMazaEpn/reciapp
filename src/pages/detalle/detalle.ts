import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service';

import { DashboardPage } from '../dashboard/dashboard';
import { CategoriaPage } from '../categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  id=null;
  category:any;
  subcategories:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categorySrv:ReciappService, public subcategoriesSrv:ReciappService) {
  	this.id=navParams.get('id');
    //console.log("PARAAM ID",this.id);
  	this.category=categorySrv.getCategoryById(this.id);
    console.log("DET CATEGORY", this.category);
    this.subcategories=subcategoriesSrv.getSubcategory(this.id).valueChanges();
    console.log(this.subcategories);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

  Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }

  Separa():void{
  	this.navCtrl.push(CategoriaPage);
  }

}