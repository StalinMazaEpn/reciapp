import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ReciappService} from '../../services/reciapp.service';

import {FirebaseProvider} from '../../providers/firebase/firebase';
import {AngularFireDatabase} from 'angularfire2/database';


import {RecicladorPage} from '../reciclador/reciclador';
import {EntregaPage} from '../entrega/entrega';
import {CategoriaPage} from '../categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  Usuario: any;
  recicladores: AngularFireDatabase<any[]>;
  newReciclador = {};

  // reciclador_tot=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, public UsuarioSrv: ReciappService) {
    this.recicladores = this.firebaseProvider.getRecicladores().valueChanges()
      // .subscribe(actions => {
      //   actions.forEach(action => {
      //     console.log(action.type);
      //     console.log(action.key);
      //     console.log(action.payload.val());
      //   });
      // });
    // this.recicladores = this.firebaseProvider.getRecicladores().snapshotChanges(['child_added']);
    // this.reciclador_tot=recicladorSrv.getReciclador_count();
    this.Usuario = UsuarioSrv.getUsuario();
    console.log(this.Usuario);
  }

  addReciclador() {
    this.firebaseProvider.addReciclador(this.newReciclador);
  }

  removeReciclador(id) {
    this.firebaseProvider.removeReciclador(id);
  }

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

  verReciclador(id) {
    this.navCtrl.push(RecicladorPage, {id: id});
  }
}
