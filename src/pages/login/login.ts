import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { RegisterPage } from '../../pages/register/register';
import { ReciappService } from '../../services/reciapp.service';
import { TabsPage } from '../../pages/tabs/tabs';
import { User } from '../../models/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv:ReciappService, public toastCtrl:ToastController) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async validate(user:User){
  	try{
  		const result=await this.userSrv.login(this.user);
  		//console.log(result);
  		if (result) {
  			//console.log(result.email);
  			this.navCtrl.setRoot(TabsPage,{userData:user});
  		}else{
  			this.failValidate();
  		}
  	}
  	catch(e){
  		console.log('Err: ',e);
  		this.failValidate();
  	}
  }

  failValidate() {
    let toast = this.toastCtrl.create({
      message: 'Usuario/Contraseña incorrecta.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}
