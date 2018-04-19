import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Geolocation } from '@ionic-native/geolocation';

import { User } from '../../models/user';
import { ReciappService } from '../../services/reciapp.service'
import { Recycler } from '../../models/recycler';

import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {AuthenticationService} from "../../services/authenticationService";

@IonicPage()
@Component({
  selector: 'page-recycler-form',
  templateUrl: 'recycler-form.html',
})
export class RecyclerFormPage {
  
  //array to get select days
  days:string;
  //Recycler age 
  age:any;
  //get to actually date
  year:any=new Date();
  //User object
  user={} as User;
  //user geolocation to maps and zoom
  lat:any;
  lng:any;
  zoom:any;
  //recycler geolocation to maps and zoom
  lat_:any;
  lng_:any;
  //Recycler object
  newRecycler={
    id:null,
    date:{
      days:this.days,
      startTime:null,
      endTime:null,
    },
    status:'active',
  } as Recycler;
  //Enabled/Disabled Button
  buttonDisabled:boolean=true;
  //form to validate
  formGroup:FormGroup;
  name:AbstractControl;
  daysValidator:AbstractControl;
  hourStart:AbstractControl;
  hourEnd:AbstractControl;
  genre:AbstractControl;
  birth:AbstractControl;
  //User data
  userData:any;
  // values by default 
  latViewDef: any = -0.184713; 
  lngViewDef: any = -78.484771;
  zoomDef: any = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public afAuth:AngularFireAuth, public userSrv:ReciappService,private geolocation: Geolocation,
    public formBuilder:FormBuilder,public authenticationService:AuthenticationService) {
    //Disabled Button
    this.isDisabled(true);  
    this.userData = this.userSrv.getUser(this.authenticationService.getCurrentUser().uid);
    this.newRecycler.idUser=this.authenticationService.getCurrentUser().uid;
    //Get location
    this.getMyLocation();
    //Funtion to validate information
    this.formValidation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecyclerFormPage');
  }

  dismiss(){
    this.navCtrl.pop();
  }

  recyclerRegister(){
    this.newRecycler.yearBirth= (this.year.getYear()+1900)-this.age;
    this.newRecycler.id=this.userSrv.getReciclerKey();
    //Call function to create new recycler
    this.userSrv.addNewRecycler(this.newRecycler.id,this.newRecycler).then(()=>{
      //Toast Ok
      this.registerOk();
      this.updatePoints(); 
      //Function to close modal - Form Recycler
      this.dismiss();  
    })
    .catch((e)=>{
      console.log(e);
    });
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

  //Get my location
  getMyLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.zoom=16;
     }).catch((error) => {
      console.log('Error getting location', error);
      this.lat=this.latViewDef;
      this.lng=this.lngViewDef;
      this.zoom=10;
     });
  }

  //Get location when user register a new user and tap
  getRecyclerLocation(event){
    console.log(event);
    this.lat_=event.coords.lat;
    this.lng_=event.coords.lng;
    this.newRecycler.latitude=event.coords.lat;
    this.newRecycler.longitude=event.coords.lng;
    this.infoCheck();
  }

  //enabled/disabled button
  isDisabled(val){
    this.buttonDisabled=val;
  }

  //funtion to validate form 
  formValidation(){
    //validations
    this.formGroup=this.formBuilder.group({
      name:['',Validators.required],
      daysValidator:['',Validators.required],
      hourStart:['',Validators.required],
      hourEnd:['',Validators.required],
      genre:['',Validators.required],
      birth:['',Validators.required]
    });
    //controls
    this.name=this.formGroup.controls['name'];
    this.daysValidator=this.formGroup.controls['daysValidator'];
    this.hourStart=this.formGroup.controls['hourStart'];
    this.hourEnd=this.formGroup.controls['hourEnd'];
    this.genre=this.formGroup.controls['genre'];
    this.birth=this.formGroup.controls['birth'];
  }

  //Function to check information to active button
  infoCheck(){
    if(this.lat_!=null && this.lng_!=null && this.newRecycler.name!=null && this.newRecycler.date.days!=null
      && this.newRecycler.date.startTime!=null && this.newRecycler.date.endTime!=null && this.newRecycler.gender!=null
       && this.age!=null){
      //Enabled buttom
      this.isDisabled(false);
    }else{
      //Disabled buttom
      //console.log('falta llenar campos');
      this.isDisabled(true);
    }
  }
}