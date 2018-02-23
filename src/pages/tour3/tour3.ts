import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tour2Page } from '../tour2/tour2';
import { Tour4Page } from '../tour4/tour4';

/**
 * Generated class for the Tour3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour3',
  templateUrl: 'tour3.html',
})
export class Tour3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tour3Page');
  }

  Avanzar():void{
  	this.navCtrl.push(Tour4Page);
  }

  Retroceder():void{
  	this.navCtrl.pop();
  }
}
