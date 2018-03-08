import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import {RecicladorPage} from '../reciclador/reciclador';
import {EntregaPage} from '../entrega/entrega';
import {CategoriaPage} from '../categoria/categoria';
import { TourPage } from './../tour/tour';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  user:any;
  recyclers:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService) {
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

  goToTour(){
    this.navCtrl.push(TourPage); 
  }
}
