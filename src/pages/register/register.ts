import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { LoginPage } from '../../pages/login/login';

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

  userData={
    email:null,
    pass:null,
  }

  user={
  	points:20,
  } as User; 

  constructor(public navCtrl: NavController, public navParams: NavParams,  public afAuth:AngularFireAuth, public userSrv:ReciappService, public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user:User){
    //console.log(this.userData);
    this.user.mail=this.userData.email;
    //console.log(this.user);
  	let min=this.userData.pass;

  	if (min.length<6) {
  		//console.log('caracteres:', min.length);
  		this.passFail();
  	}else{
  		//console.log('registrando');
  		try{
	  		const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.userData.email, this.userData.pass);
	  		const result_ = await this.userSrv.createUser(this.user);
	  		if (result) {
	  			this.userOk();
          setTimeout(()=>{this.navCtrl.push('LoginPage')},1000);
	  		}
	  	}
	  	catch(e){
	  		console.error('Err: ',e);
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
      message: 'La cuenta de correo ya existe.' ,
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
