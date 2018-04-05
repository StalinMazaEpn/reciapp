import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Geolocation } from '@ionic-native/geolocation';

import { User } from '../../models/user';
import { ReciappService } from '../../services/reciapp.service'
import { Recycler } from '../../models/recycler';
import { LoginPage } from '../login/login';

import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {AuthenticationService} from "../../services/authenticationService";

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
  zoom:any=16;
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


  buttonDisabled:boolean=true;

  //form to validate
  formGroup:FormGroup;
  name:AbstractControl;
  daysValidator:AbstractControl;
  hourStart:AbstractControl;
  hourEnd:AbstractControl;
  genre:AbstractControl;
  birth:AbstractControl;

  isAuthenticated:boolean;
  userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,
    public afAuth:AngularFireAuth, public userSrv:ReciappService,private geolocation: Geolocation,
    public formBuilder:FormBuilder,public authenticationService:AuthenticationService) {

    this.isDisabled(true);  

    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if(this.isAuthenticated) {
      //console.log("UID", this.authenticationService.getCurrentUser().uid);
      this.userData = this.userSrv.getUser(this.authenticationService.getCurrentUser().uid);
      //console.log('Formulario',this.authenticationService.getCurrentUser().uid);
      this.newRecycler.idUser=this.authenticationService.getCurrentUser().uid;
      this.getMyLocation();
      this.formValidation();
    }
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
    //console.log(this.newRecycler.id);
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
    this.infoCheck();
  }

  isDisabled(val){
    this.buttonDisabled=val;
  }

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

  infoCheck(){
    if(this.lat_!=null && this.lng_!=null && this.newRecycler.name!=null && this.newRecycler.date.days!=null
      && this.newRecycler.date.startTime!=null && this.newRecycler.date.endTime!=null && this.newRecycler.gender!=null
       && this.age!=null){

      this.isDisabled(false);
    }else{
      //console.log('falta llenar campos');
      this.isDisabled(true);
    }
  }

  loginRedirect(){
    this.navCtrl.push(LoginPage);
  }
}

