import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the RecicladorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reciclador',
  templateUrl: 'reciclador.html',
})


export class RecicladorPage {
	siguiendo: boolean = false;
	notificacion:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecicladorPage');
  }

  seguir():void{
  	if (this.siguiendo) {
  		this.siguiendo=false;
  		this.dejarReciclador();
  	}else{
  		this.siguiendo=true;
  		this.notificacion=true;
  		this.seguirReciclador();
  		setTimeout(()=>this.notificacionActivada(),2500);
  	}
  }

  notification():void{
  	if (this.notificacion) {
  		this.notificacion=false;
  		this.notificacionDesactivada();
  	}else{
  		this.notificacion=true;
  		this.notificacionActivada();
  	}
  }

  seguirReciclador() {
    let toast = this.toastCtrl.create({
      message: 'Ahora estas siguiendo al Reciclador.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  dejarReciclador() {
    let toast = this.toastCtrl.create({
      message: 'Dejaste de seguir al Reciclador.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  notificacionActivada() {
    let toast = this.toastCtrl.create({
      message: 'Te llegara información sobre tu Reciclador favorito.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  notificacionDesactivada() {
    let toast = this.toastCtrl.create({
      message: 'Haz desactivado las notificaciones.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }
}
