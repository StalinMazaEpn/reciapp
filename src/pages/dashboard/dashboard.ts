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
import { DeliveryPage } from '../delivery/delivery';

import {AuthenticationService} from "../../services/authenticationService";
import {CategoryPage} from "../category/category";
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

  porcentMaterialPapel:number=0;
  porcentMaterialPlastico:number=0;
  porcentMaterialCarton:number=0;
  porcentMaterialVidrio:number=0
  porcentMaterialChatarra:number=0;
  porcentMaterialTetrapack:number=0;

  tmpMaterial:any;
  lenghtArray:any;
  auxPapel:any=0;
  auxPlastico:any=0;
  auxCarton:any=0;
  auxVidrio:any=0;
  auxChatarra:any=0;
  auxTetrapack:any=0;

  imgDailyTip:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private afAuth:AngularFireAuth,public loadingCtrl: LoadingController, public toastCtrl:ToastController, public authenticationService:AuthenticationService,public modalCtrl: ModalController) {
    this.isLog = this.authenticationService.isAuthenticated();

    if(this.isLog) {
      //console.log("UID", this.authenticationService.getCurrentUser().uid);
      //this.user = this.userSrv.getUser(this.authenticationService.getCurrentUser().uid);
      this.userSrv.getUser(this.authenticationService.getCurrentUser().uid).subscribe(
        (data)=>{
          this.user =data;
          //console.log(this.user.lastDelivery);
      });

      this.userSrv.porcentMaterial().then((resp)=>{
        resp.subscribe((respData)=>{
          this.tmpMaterial=respData;
        });
      }).catch(e=>console.log(e));

      this.changeDailyTip();
    } else {
      this.navCtrl.setRoot(LoginPage);
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
    //console.log("Entrara");
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


          this.userSrv.porcentMaterial().then((resp)=>{
            let cont=0;
              resp.subscribe((respData)=>{
                this.tmpMaterial=respData;
                this.lenghtArray=respData.length;

                this.auxPapel=0;
                this.auxCarton=0;
                this.auxPlastico=0;
                this.auxVidrio=0;
                this.auxChatarra=0;
                this.auxTetrapack=0;

                for (var i = 0 ; i <= this.lenghtArray-1; i++) {
                  if (this.tmpMaterial[i]['idUser']==data.uid) {
                    cont++;
                    //papel
                    if (this.tmpMaterial[i]['delivery']['papel']) {
                      this.auxPapel += this.tmpMaterial[i]['delivery']['papel'];
                    }
                    //carton
                    if (this.tmpMaterial[i]['delivery']['carton']) {
                      this.auxCarton += this.tmpMaterial[i]['delivery']['carton'];
                    }
                    //plastico
                    if (this.tmpMaterial[i]['delivery']['plastico']) {
                      this.auxPlastico += this.tmpMaterial[i]['delivery']['plastico'];
                    }
                    //vidrio
                    if (this.tmpMaterial[i]['delivery']['vidrio']) {
                      this.auxVidrio += this.tmpMaterial[i]['delivery']['vidrio'];
                    }
                    //chatarra
                    if (this.tmpMaterial[i]['delivery']['chatarra']) {
                      this.auxChatarra += this.tmpMaterial[i]['delivery']['chatarra'];
                    }
                    //tetrapack
                    if (this.tmpMaterial[i]['delivery']['compuesto']) {
                      this.auxTetrapack += this.tmpMaterial[i]['delivery']['compuesto'];
                    }
                  }
                }
                this.porcentMaterialPapel=parseInt((this.auxPapel/cont).toFixed(2));
                this.porcentMaterialPlastico=parseInt((this.auxPlastico/cont).toFixed(2));
                this.porcentMaterialCarton=parseInt((this.auxCarton/cont).toFixed(2));
                this.porcentMaterialVidrio=parseInt((this.auxVidrio/cont).toFixed(2));
                this.porcentMaterialChatarra=parseInt((this.auxChatarra/cont).toFixed(2));
                this.porcentMaterialTetrapack=parseInt((this.auxTetrapack/cont).toFixed(2));

                if (isNaN(this.porcentMaterialPapel)) {
                  this.porcentMaterialPapel=null;
                }

                if (isNaN(this.porcentMaterialPlastico)) {
                  this.porcentMaterialPlastico=null;
                }

                if (isNaN(this.porcentMaterialCarton)) {
                  this.porcentMaterialCarton=null;
                }

                if (isNaN(this.porcentMaterialVidrio)) {
                  this.porcentMaterialVidrio=null;
                }

                if (isNaN(this.porcentMaterialChatarra)) {
                  this.porcentMaterialChatarra=null;
                }

                if (isNaN(this.porcentMaterialTetrapack)) {
                  this.porcentMaterialTetrapack=null;
                }
              });
          })
          .catch(e=>console.log(e));

          this.changeDailyTip();
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

  deliveryPage(){
    this.navCtrl.push(DeliveryPage);
  }

  openTips(){
    this.navCtrl.push(CategoryPage);
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

  changeDailyTip(){
    localStorage.getItem('dailyTip');
    console.log('ALMACENAMIENTO TIP', localStorage.getItem('dailyTip'));

    switch (localStorage.getItem('dailyTip')) {
      case "1":
        this.imgDailyTip='assets/imgs/tips1.png';
        break;
      case "2":
        this.imgDailyTip='assets/imgs/tips2.png';
        break;

      case "3":
        this.imgDailyTip='assets/imgs/tips3.png';
        break;
     }
  }

  goDelivery(){
    this.navCtrl.push(DeliveryPage);
  }
}
