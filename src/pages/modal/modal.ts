import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController,ToastController, ModalController } from 'ionic-angular';
import { ReciappService } from "../../services/reciapp.service";
import { AuthenticationService } from "../../services/authenticationService";
import { database } from "firebase";
import { CouponModalPage } from "../couponModal/couponModal";

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  userData;
  objExchange:any;
  usrPoints:any;
  exchangeData:any={};

  constructor( public navCtrl: NavController,private navParams: NavParams, private view: ViewController,public userSrv:ReciappService, public authSrv:AuthenticationService,
    public toastCtrl:ToastController, public modalCtrl:ModalController) {
    this.userData=this.navParams.get('userData');
    this.objExchange=this.navParams.get('objectExchange');
    //console.log(this.userData);
    this.usrPoints=this.userData.points.total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  /*ionViewWillLoad(){
    this.userData=this.navParams.get('userData');
    this.objExchange=this.navParams.get('objectExchange');
    this.usrPoints=this.userData.points.total;
  }*/

 closeModal(){
    const data = {
      name:'',
      occupation:''
    };

    this.view.dismiss(data);
  }

  exchangeGift(obj){
    this.exchangeData.date=database.ServerValue.TIMESTAMP;
    this.exchangeData.uid=this.authSrv.getCurrentUser().uid;
    this.exchangeData.exchange={
      id: obj.id,
      points: obj.points
    };
    this.userSrv.exchangePoints(this.exchangeData)
    .then((resp)=>{
      this.usrPoints-=this.exchangeData.exchange.points;
      //this.okExchange();
      this.dismiss();

      //Add expired date when change a coupon
      obj.expireDate=moment().add( 24, 'hours' ).format( 'DD [de] MMMM YYYY HH:mm' );

      this.goCouponModal(obj);
    })
    .catch(e=>console.log(e));
    //console.log(this.exchangeData);
  }

  okExchange(){
    let toast = this.toastCtrl.create({
      message: 'Tu canje ha sido exitoso, tienes 24 horas para acercarte al local a reclamar tu premio.' ,
      duration: 5000,
      position:'middle',
      cssClass:'text-center'
    });
    toast.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  goCouponModal(objExchange){
    const modal=this.modalCtrl.create(CouponModalPage,{ objectExchange: objExchange, userData: this.userData });
    modal.present();
  }
}

