import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user={ 
  	points:0,
  	favoritiesReciclers:{},
  	registeredRecyclers:{}

  } as User; 

  constructor(public navCtrl: NavController, public navParams: NavParams,  public afAuth:AngularFireAuth, public userSrv:ReciappService, public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user:User){
  	let min=this.user.password;
  	if (min.length<6) {
  		//console.log('caracteres:', min.length);
  		this.passFail();
  	}else{
  		//console.log('registrando');
  		try{
	  		const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.mail, this.user.password);
	  		const result_ = await this.userSrv.createUser(this.user);
	  		if (result) {
	  			this.userOk();
	  		}
	  	}
	  	catch(e){
	  		//console.error('Err: ',e);
	  		this.userFail();
	  	}
  	}  	
  }

  register_fb(){
  	console.log('registro fb');	 
  }

  userOk() {
    let toast = this.toastCtrl.create({
      message: 'El registro a sido correcto.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  userFail() {
    let toast = this.toastCtrl.create({
      message: 'Hemos tenido un problema con tu registro.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  passFail() {
    let toast = this.toastCtrl.create({
      message: 'La contraseña debe tener 6 caracteres mínimos.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }
}
