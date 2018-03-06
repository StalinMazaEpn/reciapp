import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RecicladorPage } from '../../pages/reciclador/reciclador';
import { LoginPage }  from '../../pages/login/login';
import { RegisterPage }  from '../../pages/register/register';

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

  register_mail():any{
  	//console.log('mail');
    this.navCtrl.push('RegisterPage');
  }

  register_fb():any{
  	console.log('fb');
  }

  login(){
    this.navCtrl.push('LoginPage');
    //console.log('inicio');
  }

  verReciclador(){
    this.navCtrl.push(RecicladorPage);
  }
}
