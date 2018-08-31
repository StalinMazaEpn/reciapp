import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';

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
  	points:{
      pointsRegister:20,
      pointsDelivery:0,
      pointsFavorite:0,
      pointsRecycler:0,
      total: 20
    },
    lastDelivery:0,
    totalDeliveries:0
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
  		try{
	  		const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.userData.email, this.userData.pass);
	  		if (result) {
          console.log(result.uid);
          console.log( this.user );
          const result_ = this.userSrv.createUser(result.uid,this.user);
          if (result_) {
            this.userOk();
            setTimeout(()=>{this.navCtrl.setRoot(TabsPage)},1000);
          }
	  		}
	  	}
	  	catch(e){
        this.errorToast(e.code);
	  		console.error('Err: ',e);
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

  errorToast(message){
    switch (message) {
      case "auth/email-already-in-use":
        message="El correo ya se encuentra registrado.";
        break;

      case "auth/invalid-email":
        message="Ingresa un correo válido.";
        break;

      case "auth/weak-password":
        message="La contraseña debe tener 6 caracteres.";
        break;

      case "auth/argument-error":
        message="Los campos no deben estar vacíos.";
        break;
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }
}
