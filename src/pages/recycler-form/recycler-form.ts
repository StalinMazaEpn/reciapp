import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Geolocation } from '@ionic-native/geolocation';

import { User } from '../../models/user';
import { ReciappService } from '../../services/reciapp.service'
import { Recycler } from '../../models/recycler';

@IonicPage()
@Component({
  selector: 'page-recycler-form',
  templateUrl: 'recycler-form.html',
})
export class RecyclerFormPage {
  
  uid:any;
  //array to get select days
  days:string;
  //Recycler age 
  age:any;
  //get to actually date
  year:any=new Date();
  //User object
  user={} as User;
  points:any;
  //user geolocation to maps and zoom
  lat:any;
  lng:any;
  zoom:any=14;
  //recycler geolocation to maps and zoom
  lat_:any;
  lng_:any;
  //Recycler object
  newRecycler={
    date:{
      days:this.days,
      startTime:null,
      endTime:null,
    },
    status:'active',
    idUser:this.uid,
  } as Recycler;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public afAuth:AngularFireAuth, public userSrv:ReciappService,private geolocation: Geolocation) {
    //console.log(this.year.getYear()+1900);
    this.afAuth.authState.subscribe(
      data => {
        //console.log(data);
        this.newRecycler.idUser=data.uid;
      });

    this.getMyLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecyclerFormPage');
  }

  dismiss(){
  	this.navCtrl.pop();
  }

  recyclerRegister(){
    this.newRecycler.yearBirth= (this.year.getYear()+1900)-this.age;
    //console.log(this.recycler);
    //console.log(this.recycler.idUser);
    let userData;
    
    //function to get user Data
    this.userSrv.getUser(this.newRecycler.idUser).subscribe((resp)=>{
      //asigned user data
      userData=resp;
      //sum points when registered a recycler
      this.points=100+userData.points;
      //Asigned all data
      this.user=userData;
      this.user.points=this.points;
      //console.log('data fb',userData);
      //console.log('data up',this.user);
      //console.log(this.points);

      //Function to update points
      //this.userSrv.updatePoints(this.recycler.idUser,this.user);
      
      //Toast
      this.updatePoints();
    });
    
    //console.log(this.newRecycler);
    console.log(this.userSrv.getReciclerKey());
    this.newRecycler.id=this.userSrv.getReciclerKey();
    //Call function to create new recycler
    this.userSrv.addNewRecycler(this.newRecycler.id,this.newRecycler);
    //Toast
    this.registerOk();
    //Function to close modal - Form
    this.dismiss();
  }

  registerOk() {
    let toast = this.toastCtrl.create({
      message: 'El registro a sido correcto.' ,
      duration: 4000,
      position:'top'
    });
    toast.present();
  }

  updatePoints() {
    let toast = this.toastCtrl.create({
      message: 'Haz ganado 100 puntos.' ,
      duration: 2000,
      position:'top'
    });
    toast.present();
  }

  getMyLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getRecyclerLocation(event){
    console.log(event);
    this.lat_=event.coords.lat;
    this.lng_=event.coords.lng;
    this.newRecycler.latitude=event.coords.lat;
    this.newRecycler.longitude=event.coords.lng;
  }
}
