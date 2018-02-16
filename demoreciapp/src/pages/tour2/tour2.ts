import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tour1Page } from '../tour1/tour1';
import { Tour3Page } from '../tour3/tour3';
/**
 * Generated class for the Tour2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour2',
  templateUrl: 'tour2.html',
})
export class Tour2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tour2Page');
  }

  Avanzar():void{
  	this.navCtrl.push(Tour3Page);
  }

  Retroceder():void{
  	this.navCtrl.pop();
  }
}
