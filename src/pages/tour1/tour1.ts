import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tour2Page } from '../tour2/tour2'

/**
 * Generated class for the Tour1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour1',
  templateUrl: 'tour1.html',
})
export class Tour1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tour1Page');
  }

  Avanzar():void{
  	this.navCtrl.push(Tour2Page);
  }

}
