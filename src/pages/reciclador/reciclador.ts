import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-reciclador',
  templateUrl: 'reciclador.html',
})


export class RecicladorPage {
	siguiendo: boolean = false;
	notificacion:boolean=false;
  id=null;

  reciclador:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public RecicladorSrv:ReciappService) {
    this.id=navParams.get('id');
    this.reciclador=RecicladorSrv.getRecyclerById(this.id);

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

  notification(name):void{
    console.log(name);
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
      message: 'Ahora estas siguiendo a '+this.reciclador.name+'.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  dejarReciclador() {
    let toast = this.toastCtrl.create({
      message: 'Dejaste de seguir a '+this.reciclador.name+'.',
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  notificacionActivada() {
    let toast = this.toastCtrl.create({
      message: 'Te llegara información sobre '+this.reciclador.name+'.',
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
