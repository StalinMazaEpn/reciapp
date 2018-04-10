import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';
import { AuthenticationService } from '../../services/authenticationService';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reciclador',
  templateUrl: 'reciclador.html',
})


export class RecicladorPage {
	siguiendo: boolean = false;
	notificacion:boolean=false;
  id=null;
  iduser=null;

  recycler:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public RecicladorSrv: ReciappService, public callNumber: CallNumber, private alertCtrl: AlertController, public authService:AuthenticationService) {
    this.recycler = navParams.get('recycler');
    console.log(this.recycler);
    let user = new Object (this.recycler.favoriteUsers);

    /*if(this.RecicladorSrv.afAuth.auth.currentUser.uid){
      this.iduser = this.RecicladorSrv.afAuth.auth.currentUser.uid;
      this.siguiendo = user.hasOwnProperty(this.iduser);
    }*/

    if(this.authService.isAuthenticated()){
      this.iduser=this.authService.getCurrentUser().uid;
      this.siguiendo = user.hasOwnProperty(this.iduser);
    }else{
      console.log('sin sesion');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecicladorPage');
  }

  ionViewWillLeave() {
    this.navCtrl.popToRoot();
  }

  seguir(id):void{
  	if (this.siguiendo) {
  		this.siguiendo=false;
  		this.dejarReciclador(id);
  	}else{
  		this.siguiendo=true;
  		this.notificacion=true;
  		this.seguirReciclador(id);
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

  async seguirReciclador(id) {
    let toast = this.toastCtrl.create({
      message: 'Ahora estas siguiendo a '+this.recycler.name+'.',
      duration: 3000,
      position:'top'
    });
    try {
      const result = await this.RecicladorSrv.putLoveRecicler(id,this.iduser);
      if(result){
        toast.present();
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  
  async dejarReciclador(id) {
    let toast = this.toastCtrl.create({
      message: 'Dejaste de seguir a '+this.recycler.name+'.',
      duration: 3000,
      position:'top'
    });
    try {
      const result = await this.RecicladorSrv.removeLoveRecicler(id,this.iduser);
      if(result){
        toast.present();
      }
    } catch (error) {
      console.log(error);
    }
  }

  notificacionActivada() {
    let toast = this.toastCtrl.create({
      message: 'Te llegara información sobre '+this.recycler.name+'.',
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

  doCallNumber(phoneNumber: string) {
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
            this.callNumber.callNumber(phoneNumber, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
          }
        }
      ]
    });
    alert.present();
  }

}
