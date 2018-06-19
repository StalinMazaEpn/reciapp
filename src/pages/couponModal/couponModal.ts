import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController} from 'ionic-angular';
import { ReciappService } from "../../services/reciapp.service";

@IonicPage()
@Component({
  selector: 'page-coupon-modal',
  templateUrl: 'couponModal.html',
})
export class CouponModalPage {
  userData;
  objExchange:any;
  usrPoints:any;
  exchangeData:any={};

  constructor( public navCtrl: NavController,private navParams: NavParams, private view: ViewController,public userSrv:ReciappService) {
    this.userData=this.navParams.get('userData');
    this.objExchange=this.navParams.get('objectExchange');
    console.log(this.userData);
    this.usrPoints=this.userData.points.total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal(){
    const data = {
      name:'jose',
      occupation:'Milkman'
    };

    this.view.dismiss(data);
  }

  dismiss() {
    this.navCtrl.pop();
  }
}

