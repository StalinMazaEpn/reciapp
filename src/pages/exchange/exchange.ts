import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {

	exchangeList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public userSrv: ReciappService) {

  	this.userSrv.getExchangeList().subscribe((data)=>{
  		this.exchangeList=data;
  	});
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangePage');
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
