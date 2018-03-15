import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';


import { ReciappService } from '../../services/reciapp.service'
import { Recycler } from '../../models/recycler';

@IonicPage()
@Component({
  selector: 'page-recycler-form',
  templateUrl: 'recycler-form.html',
})
export class RecyclerFormPage {
  uid:any;
  days:string;
  recycler={
    date:{
      days:this.days,
      startTime:null,
      endTime:null,
    },
    status:'active',
    idUser:this.uid
  } as Recycler;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public afAuth:AngularFireAuth, public userSrv:ReciappService,) {
    
    this.afAuth.authState.subscribe(
      data => {
        //console.log(data);
        this.recycler.idUser=data.uid;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecyclerFormPage');
  }

  dismiss(){
  	this.navCtrl.pop();
  }

  recyclerRegister(){
    //console.log(this.recycler);
   
    this.userSrv.addNewRecycler(this.recycler);
    this.registerOk();
    this.dismiss();
  }

  registerOk() {
    let toast = this.toastCtrl.create({
      message: 'El registro a sido correcto.' ,
      duration: 2000,
      position:'top'
    });
    toast.present();
  }

}
