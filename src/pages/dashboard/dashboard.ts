import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import { ToastController } from 'ionic-angular';

import { RecicladorPage } from '../../pages/reciclador/reciclador';
import { LoginPage }  from '../login/login';
import { RegisterPage }  from '../register/register';
//import { User } from '../../models/user';
import { ExchangePage }  from '../exchange/exchange';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

import { MapPage } from '../map/map';

import {AuthenticationService} from "../../services/authenticationService";
import {CategoriaPage} from "../categoria/categoria";
//import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  //@ViewChild(Slides) slides: Slides;
  isLog:boolean;
  user:any;
  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private afAuth:AngularFireAuth,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public authenticationService:AuthenticationService,public modalCtrl: ModalController) {

    this.isLog = this.authenticationService.isAuthenticated();
    if(this.isLog) {
      //console.log("UID", this.authenticationService.getCurrentUser().uid);
      //this.user = this.userSrv.getUser(this.authenticationService.getCurrentUser().uid);
      this.userSrv.getUser(this.authenticationService.getCurrentUser().uid).subscribe(
        (data)=>{
          this.user =data;
          console.log(this.user.lastDelivery);
        });
    }
  }

  /*removeReciclador(id) {
    this.firebaseProvider.removeReciclador(id);
  }*/

  // ionViewDidLoad() {
  //   this.afAuth.authState.subscribe(
  //     data => {
  //       this.uid=data.uid;
  //     });
  // }

  ionViewWillEnter(){
    console.log("Entrara");
    this.afAuth.authState.subscribe(
      data => {
        if(data && data.uid){
          console.log("UID", data.uid);
          this.recyclers = this.recyclerSrv.getFavoritiesRecycler(data.uid)
          .map((recyclerId)=>{
            return recyclerId.map(recyclerObj => {
              return this.recyclerSrv.getRecyclerById(recyclerObj.payload.key);
            })
          })
          console.log("RECICLADORES", this.recyclers);
        }
      });
    /*this.recyclers = null;
    if(this.uid != null){
      console.log(this.uid);
      this.recyclers = this.recyclerSrv.getFavoritiesRecycler(this.uid);
      console.log(this.recyclers);
    }*/
  }
  // ionViewDidEnter(){
  //   console.log("Entro");
  //   if(this.isLog && this.recyclers == null && this.uid != null){
  //     console.log(this.uid);
  //     this.recyclers = this.recyclerSrv.getFavoritiesRecycler(this.uid);
  //     console.log(this.recyclers);
  //   }
  // }

  ionViewDidLeave(){
    this.recyclerSrv.favorities = [];
    this.recyclers = null;
  }
  goRecycler(recycler) {
    console.log(recycler);
    this.navCtrl.push(RecicladorPage, {recycler});

  }

  openMap(){
    this.navCtrl.push(MapPage);
  }

  openTips(){
    this.navCtrl.push(CategoriaPage);
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

  exchange(){
    let modal = this.modalCtrl.create(ExchangePage);
    modal.present();
  }

 /* goToSlide() {
    this.slides.slideTo(2, 500);
  }*/

}
