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

import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  isLog:boolean;
  user:any={} as User;
  recyclers:any;

  //uid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private afAuth:AngularFireAuth,public loadingCtrl: LoadingController, public toastCtrl:ToastController,private emailComposer: EmailComposer, private iab: InAppBrowser) {
    this.isLog=window.localStorage['isLog'];
    this.user=null;
    this.afAuth.authState.subscribe(
      data => {
        //console.log(data);
        //this.uid=data.uid;
        this.user=this.userSrv.getUser(data.uid);
      });
    this.recyclers=this.recyclerSrv.getRecycler();
  }

  /*constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private emailComposer: EmailComposer, private iab: InAppBrowser) {
    this.recyclers = this.recyclerSrv.getRecycler();
    this.user = this.userSrv.getUser();  
  }*/
  
  /*addReciclador() {
    this.firebaseProvider.addReciclador(this.newReciclador);
  }

  removeReciclador(id) {
    this.firebaseProvider.removeReciclador(id);
  }*/

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

  /*logout(){
    console.log('cerrar');
    localStorage.removeItem('isLog');
    this.isLog=false;
  }*/

  /*goToTour(){
    this.navCtrl.push(TourPage); 
  }*/

  sendEmail(){

    console.log("hola");
    let email = {
      to: 'pilar_1304@hotmail.es',
      cc: 'henry.red1@hotmail.com',
      subject: 'Cordova Icons',
      body: 'Esto es una prueba de correo desde una app',
      isHtml: true
    };

        this.emailComposer.open(email);
  }

  entrarFb(){
    const browser = this.iab.create('https://www.facebook.com/reciveci/');
    browser.show();
  }

  entrarTw(){
    const browser = this.iab.create('https://twitter.com/reciveci');
    browser.show();
  }
}
