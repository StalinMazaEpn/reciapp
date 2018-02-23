import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service';

import { EntregaPage } from '../entrega/entrega';
import { DashboardPage } from '../dashboard/dashboard';
import { CategoriaPage } from '../categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  id=null;
  categoria:any;
  reciclables:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CategoriaSrv:ReciappService, public ReciclableSrv:ReciappService) {
  	this.id=navParams.get('id');
  	this.categoria=CategoriaSrv.getCategoria(this.id);

    this.reciclables=ReciclableSrv.getReciclables(this.categoria.id);

    console.log(this.reciclables);
    
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

  Entrega():void{
  	this.navCtrl.push(EntregaPage);
  }
}
