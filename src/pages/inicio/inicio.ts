import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { RecicladorPage } from '../../pages/reciclador/reciclador';
import { LoginPage }  from '../../pages/login/login';
import { DashboardPage }  from '../../pages/dashboard/dashboard';
import { RegisterPage }  from '../../pages/register/register';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth, public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  register_mail():any{
  	//console.log('mail');
    this.navCtrl.push('RegisterPage');
  }

  register_fb():any{
    let provider= new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(error){
        alert(JSON.stringify(error))
      });
    })

  	
    /*try{
        const provider= new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
            //console.log(res); 
            //console.log(res.user.displayName);
            //console.log(res.user.email);
            //alert(JSON.stringify(res));
            if (res.user.email!=null) {
              this.isLogin();
            }else{
              this.failLogin();
            }
            
          })
        .catch(function(e){ 
            console.log(e)
          });
      }
    catch(e){
      console.log(e);
    }*/
  }

  login(){
    this.navCtrl.push('LoginPage');
    //console.log('inicio');
  }

  verReciclador(){
    this.navCtrl.push(RecicladorPage);
  }
    
  isLogin(){
    this.navCtrl.push('DashboardPage');
  }

  failLogin(){
    let toast = this.toastCtrl.create({
      message: 'Parece que tenemos problema al obtener tu correo electrónico, intenta con diferente método de registro.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }
}
