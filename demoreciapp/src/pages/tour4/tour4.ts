import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tour3Page } from '../tour3/tour3';
import { InicioPage } from '../inicio/inicio';
/**
 * Generated class for the Tour4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour4',
  templateUrl: 'tour4.html',
})
export class Tour4Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tour4Page');
  }

  Avanzar():void{
  	this.navCtrl.push(InicioPage);
  }

  Retroceder():void{
  	this.navCtrl.pop();
  }
}
