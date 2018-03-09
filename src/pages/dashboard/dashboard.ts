import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import {RecicladorPage} from '../reciclador/reciclador';
import {EntregaPage} from '../entrega/entrega';
import {CategoriaPage} from '../categoria/categoria';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  user:any;
  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private emailComposer: EmailComposer, private iab: InAppBrowser) {
    this.recyclers = this.recyclerSrv.getRecycler();

    this.user = this.userSrv.getUser();

    
  }

  

  /*addReciclador() {
    this.firebaseProvider.addReciclador(this.newReciclador);
  }

  removeReciclador(id) {
    this.firebaseProvider.removeReciclador(id);
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  /*Dashboard():void{
  	this.navCtrl.push(DashboardPage);
  }*/

  Separa(): void {
    this.navCtrl.push(CategoriaPage);
  }

  Entrega(): void {
    this.navCtrl.push(EntregaPage);
  }

  goRecycler(id) {
    this.navCtrl.push(RecicladorPage, {id: id});
  }

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
