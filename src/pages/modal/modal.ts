import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import { ReciappService } from "../../services/reciapp.service";
import { AuthenticationService } from "../../services/authenticationService";
import { database } from "firebase";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public toastCtrl:ToastController) {
    this.userData=this.navParams.get('userData');
    this.objExchange=this.navParams.get('objectExchange');
    console.log(this.userData);
    this.usrPoints=this.userData.points.total;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  /*ionViewWillLoad(){
    const data = this.navParams.get('data');
    console.log(data);
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
    this.exchangeData.exchange=obj;
    this.userSrv.exchangePoints(this.exchangeData)
    .then((resp)=>{
      this.usrPoints-=this.exchangeData.exchange.points;
      this.exchangeExpired();
      this.okExchange();
      this.dismiss();
    })
    .catch(e=>console.log(e));
    //console.log(this.exchangeData);
  }

  okExchange(){
    let toast = this.toastCtrl.create({
      message: 'Tu canje se ha realizado correctamente.' ,
      duration: 2000,
      position:'middle',
      cssClass:'text-center'
    });
    toast.present();
  }

  exchangeExpired(){
    let toast = this.toastCtrl.create({
      message: 'Tienes 24 horas para acercarte al local y obtener tu premio.' ,
      duration: 6000,
      position:'middle',
      cssClass:'text-center'
    });
    toast.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }
}

