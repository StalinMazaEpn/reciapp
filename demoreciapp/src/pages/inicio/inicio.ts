import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RecicladorPage } from '../../pages/reciclador/reciclador';
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  login_gmail():any{
  	console.log('gmail');
  }

  login_fb():any{
  	console.log('fb');
  }

  verReciclador(){
    this.navCtrl.push(RecicladorPage);
  }
}
