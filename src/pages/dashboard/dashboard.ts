import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import { AngularFireAuth } from 'angularfire2/auth';

import {RecicladorPage} from '../reciclador/reciclador';

import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  user:any={} as User;
  recyclers:any;
  //uid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userSrv: ReciappService,public recyclerSrv: ReciappService, private afAuth:AngularFireAuth,public loadingCtrl: LoadingController) {
    this.user=null;
    this.afAuth.authState.subscribe(
      data => {
        //console.log(data);
        //this.uid=data.uid;
        this.user=this.userSrv.getUser(data.uid);
      });
    this.recyclers=this.recyclerSrv.getRecycler();
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

  goRecycler(id) {
    this.navCtrl.push(RecicladorPage, {id: id});
  }
}
