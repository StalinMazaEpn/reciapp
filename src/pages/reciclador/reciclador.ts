import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reciclador',
  templateUrl: 'reciclador.html',
})


export class RecicladorPage implements OnInit {
	siguiendo: boolean = false;
	notificacion:boolean=false;
  id=null;

  reciclador:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public RecicladorSrv: ReciappService, public callNumber: CallNumber, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.reciclador = this.RecicladorSrv.getRecyclerById(this.id);
    console.log(this.reciclador);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecicladorPage');
  }

  ionViewWillLeave() {
    this.navCtrl.popToRoot();
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

  doCallNumber() {
    let alert = this.alertCtrl.create({
      title: 'Llamada',
      message: 'Desea realizar la llamada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Llamar',
          handler: () => {
            this.callNumber.callNumber('0984582618', true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
          }
        }
      ]
    });
    alert.present();
  }

}
