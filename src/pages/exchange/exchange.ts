import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';
import { AuthenticationService } from '../../services/authenticationService';
import { ModalPage } from '../modal/modal';
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

	exchangeList;
  userPts;
  userName;
  userData;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userSrv: ReciappService,public modalCtrl: ModalController,
    public authSrv:AuthenticationService) {
    
    this.userSrv.getUser(this.authSrv.getCurrentUser().uid).subscribe((data)=>{
      this.userData=data;
      this.userPts=data['points']['total'];
      this.userName=data['name'];
    });
    //this.userData=this.navParams.get('userData');
    //this.userPts=this.userData.points.total;
    //this.userName=this.userData.name;
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

  exchangeModal(objExchange){
    //console.log('BEFORE',objExchange);
    let modal = this.modalCtrl.create(ModalPage,{objectExchange:objExchange, userData:this.userData});
    modal.present();
  }
}
