import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import { ToastController } from 'ionic-angular';

import { RecicladorPage } from '../../pages/reciclador/reciclador';
import { LoginPage }  from '../login/login';
import { RegisterPage }  from '../register/register';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

/*import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';*/

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  isLog:boolean=false;
  user:any={} as User;
  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private afAuth:AngularFireAuth,public loadingCtrl: LoadingController, public toastCtrl:ToastController) {
   
    this.user=null;
    this.afAuth.authState.subscribe(
      data => {
        if (data && data.uid && data.email) {
          this.user=this.userSrv.getUser(data.uid);
          this.isLog=true;
        }else{
          this.isLog=false;
        }
      });
    this.recyclers=this.recyclerSrv.getRecycler();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goRecycler(id) {
    this.navCtrl.push(RecicladorPage, {id: id});
  }
  register_mail():any{
    //console.log('mail');
    this.navCtrl.push(RegisterPage);
  }

  register_fb():any{
    let provider= new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider).then(()=>{
      this.afAuth.auth.getRedirectResult().then((result)=>{
        alert(JSON.stringify(result));
      }).catch(function(e){
        alert(JSON.stringify(e));
      })
    });
    /*firebase.auth().signInWithRedirect(provider).then(()=>{
      firebase.auth().getRedirectResult().then(
        (result)=>{
          alert(JSON.stringify(result));
        }).catch(function(error){
          alert(JSON.stringify(error))
        });
    })*/
    
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
    this.navCtrl.push(LoginPage);
    //console.log('inicio');
  }

  verReciclador(){
    this.navCtrl.push(RecicladorPage);
  }
    
  isLogin(){
    this.navCtrl.push(DashboardPage);
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
