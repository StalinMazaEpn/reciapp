import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';

import {Geolocation} from '@ionic-native/geolocation';

import {User} from '../../models/user';
import {ReciappService} from '../../services/reciapp.service'
import {Recycler} from '../../models/recycler';
import {LoginPage} from '../login/login';
import {RecicladorPage} from '../reciclador/reciclador';

import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {AuthenticationService} from "../../services/authenticationService";

import firebase from "firebase";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { database } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-recycler-form',
  templateUrl: 'recycler-form.html',
})
export class RecyclerFormPage {

  uid: any;
  //array to get select days
  days: string;

 // selectCheck:any;

  //array to get select material recycleble
  material: string;
  //Recycler age
  age: any;
  // Recycling for
  recyclingFor: any;
  //get to actually date
  year: any = new Date();
  //User object
  user = {} as User;
  points: any;
  //user geolocation to maps and zoom
  lat: any;
  lng: any;
  zoom: any = 16;
  //recycler geolocation to maps and zoom
  lat_: any;
  lng_: any;
  //Recycler object
  newRecycler = {
    date: {
      days: this.days,
      startTime: undefined,
      endTime: undefined,
    },
    status: 'active',
    totalReceives:0
  } as Recycler;

  //photo
  photoRecycler: any;
  tmp_image: any = undefined;
  default_image: any = 'assets/imgs/recycler_women.png';
  //enabled or disabled button
  buttonDisabled: boolean = true;
  saving: boolean = false;

  //form to validate
  formGroup: FormGroup;
  name: AbstractControl;
  lastName: AbstractControl;
  daysValidator: AbstractControl;
  hourStart: AbstractControl;
  hourEnd: AbstractControl;
  materialValidator: AbstractControl;
  gender: AbstractControl;
  birth: AbstractControl;

  // isAuthenticated: boolean;
  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              public afAuth: AngularFireAuth, public userSrv: ReciappService, private geolocation: Geolocation,
              public formBuilder: FormBuilder, public authenticationService: AuthenticationService, private camera: Camera) {
    this.userData = this.userSrv.getUser(this.authenticationService.getCurrentUser().uid);
    this.newRecycler.idUser = this.authenticationService.getCurrentUser().uid;
    this.getMyLocation();
    this.formValidation();
    this.newRecycler.material = new Array();
    this.newRecycler.date.days = new Array();
    //this.newRecycler.gender = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecyclerFormPage');
  }

  recyclerRegister() {
    this.buttonDisabled = true;
    this.saving = true;

    //Get a new id and assign to image recycler
    this.newRecycler.id = this.userSrv.getReciclerKey();

    this.newRecycler.yearBirth = this.year.getFullYear() - this.age;
    if (this.recyclingFor)
      this.newRecycler.yearStartRecycling = this.year.getFullYear() - this.recyclingFor;
    this.newRecycler.createdAt = database.ServerValue.TIMESTAMP;
    

    if (this.tmp_image !== undefined) {
      //Storage on firebase
      const pictures = firebase.storage().ref('recicladores/' + this.newRecycler.id + '.jpeg');
      pictures.putString(this.tmp_image, 'data_url')
        .then((snapshot) => {
          // Upload completed successfully, now we can get the download URL
          this.newRecycler.image = snapshot.downloadURL;
          console.log("IMAGE", this.newRecycler.image);
          console.log(this.newRecycler);
          //Call function to create new recycler
          this.userSrv.addNewRecycler(this.newRecycler.id, this.newRecycler).then(() => {
            //Toast Ok
            this.saving = false;
           
            this.registerOk();                                                                
            this.navCtrl.push(RecicladorPage, {recycler: this.newRecycler });                   
            // this.updatePoints(); // TODO
            console.log("REGISTERED RECYCLER", this.newRecycler);
            //Function to close modal - Form Recycler
            this.dismiss();
          })
            .catch((e) => {
              this.buttonDisabled = false;
              console.log("COULD NOT REGISTER RECYCLER", e);
            });
        })
        .catch((error) => {
          this.buttonDisabled = false;
          console.log("NOT UPLOADED", error);
        });

    } else {
      console.log("REGISTER NO PHOTO");
      //Call function to create new recycler
      this.userSrv.addNewRecycler(this.newRecycler.id, this.newRecycler).then(() => {
        //Toast Ok
        this.saving = false;
        this.registerOk();
        // this.updatePoints(); // TODO
        //Function to close modal - Form Recycler
        this.dismiss();
        this.navCtrl.push(RecicladorPage, {recycler: this.newRecycler });
      })
        .catch((e) => {
          console.log("ERROR: ", e);
        });
    }

    

    //this.navCtrl.push(RecicladorPage);

  }

  registerOk() {
    let toast = this.toastCtrl.create({
      message: 'El registro ha sido correcto.',
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  addMaterial(checked: boolean, value:string){
    console.log(checked);
    console.log(value);
    if(checked){
      this.newRecycler.material.push(value);
    }
    else{
      let index = this.newRecycler.material.findIndex(x => x.value == value);
      console.log(index); 
      this.newRecycler.material.splice(index, 1);
    }
    console.log(this.newRecycler.material);    
  }

  addDays(checked: boolean, value:string){
    console.log(checked);
    console.log(value);
    if(checked){
      this.newRecycler.date.days.push(value);
    }
    else{
      let index = this.newRecycler.date.days.findIndex(x => x.value == value);
      this.newRecycler.date.days.splice(index, 1);
    }
    console.log(this.newRecycler.date.days);    
  }

  /*addGender(checked: boolean, value:string){
    console.log(checked);
    console.log(value);
    if(checked){
      this.newRecycler.gender.push(value);
    }
    else{
      let index = this.newRecycler.gender.findIndex(x => x.value == value);
      console.log(index); 
      this.newRecycler.gender.splice(index, 1);
    }
    console.log(this.newRecycler.gender);    
  }*/

   updatePoints() {
      let toast = this.toastCtrl.create({
      message: 'Has ganado 100 puntos.',
      duration: 2000,
      position: 'top'
    });
      toast.present();
  }

  getMyLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getRecyclerLocation(event) {
    console.log(event);
    this.lat_ = event.coords.lat;
    this.lng_ = event.coords.lng;
    this.newRecycler.latitude = event.coords.lat;
    this.newRecycler.longitude = event.coords.lng;
  }

  dismiss() {
    this.navCtrl.pop();
  }

  formValidation() {
    //validations
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      // daysValidator: ['', Validators.required],
      //materialValidator: ['', Validators.required],
      // materialValidator:this.formBuilder.group({
      //   Papel: [false, Validators.required],
      //   Carton: [false, Validators.required],
      //   Plastico: [false, Validators.required],
      //   Vidrio: [false, Validators.required],
      //   Metal: [false, Validators.required],
      //   Tetrapack: [false, Validators.required]
      // },
      // (formGroup: FormGroup)=>{
      //   for (let key in formGroup.controls) {
      //     if (formGroup.controls.hasOwnProperty(key)) {
      //       let control: FormControl = <FormControl>formGroup.controls[key];
      //       if (control.value) {
      //         return null;
      //       }
      //     }
      //     else{
      //       return false;
      //     }
      //   }
      //   return false
      // }),
      daysValidator: this.formBuilder.group({
        Lunes: [false, Validators.required],
        Martes: [false, Validators.required],
        Miercoles: [false, Validators.required],
        Jueves: [false, Validators.required],
        Viernes: [false, Validators.required],
        Sabado: [false, Validators.required],
        Domingo: [false, Validators.required]
      },
      (formGroup: FormGroup)=>{
        for (let key in formGroup.controls) {
          if (formGroup.controls.hasOwnProperty(key)) {
            let control: FormControl = <FormControl>formGroup.controls[key];
            if (control.value) {
              return null;
            }
          }
          else{
            return false;
          }
        }
        return false
      }),

      materialValidator:this.formBuilder.group({
        Papel: [false, Validators.required],
        Carton: [false, Validators.required],
        Plastico: [false, Validators.required],
        Vidrio: [false, Validators.required],
        Metal: [false, Validators.required],
        Tetrapack: [false, Validators.required]
      },
      (formGroup: FormGroup)=>{
        for (let key in formGroup.controls) {
          if (formGroup.controls.hasOwnProperty(key)) {
            let control: FormControl = <FormControl>formGroup.controls[key];
            if (control.value) {
              return null;
            }
          }
          else{
            return false;
          }
        }
        return false
      }),
      hourStart: ['', Validators.compose([Validators.required, (control: FormControl) => {
        if (this.newRecycler.date.startTime > this.newRecycler.date.endTime) {
          return {
            'La hora de inicio debe ser menor a la hora de fin': true
          };
        }
        return null;
      }])],
      hourEnd: ['', Validators.compose([Validators.required, (control: FormControl) => {
        if (this.newRecycler.date.startTime > this.newRecycler.date.endTime) {
          return {
            'La hora de inicio debe ser menor a la hora de fin': true
          };
        }
        return null;
      }])],
      /*gender: ['', Validators.required],

      genderValidator:this.formBuilder.group({
        Hombre: [false, Validators.required],
        Mujer: [false, Validators.required],
        Otro: [false, Validators.required],
      },
      (formGroup: FormGroup)=>{
        for (let key in formGroup.controls) {
          if (formGroup.controls.hasOwnProperty(key)) {
            let control: FormControl = <FormControl>formGroup.controls[key];
            if (control.value) {
              return null;
            }
          }
          else{
            return false;
          }
        }
        return false
      }),*/
      gender: ['', Validators.required],
      birth: ['', Validators.required]
    });
    //controls
    this.name = this.formGroup.controls['name'];
    this.lastName = this.formGroup.controls['lastName'];
    this.daysValidator = this.formGroup.controls['daysValidator'];
    this.materialValidator = this.formGroup.controls['materialValidator'];
    this.hourStart = this.formGroup.controls['hourStart'];
    this.hourEnd = this.formGroup.controls['hourEnd'];
    this.gender = this.formGroup.controls['gender'];
    this.birth = this.formGroup.controls['birth'];
  }

  disableButton() {
    console.log("DISABLE?");
    this.buttonDisabled =
      this.lat_ === undefined ||
      this.lng_ === undefined ||
      this.newRecycler.name === undefined || this.newRecycler.name.length === 0 ||
      this.newRecycler.lastName === undefined || this.newRecycler.lastName.length === 0 ||
      this.newRecycler.date.days === undefined ||
      this.newRecycler.material === undefined ||    
      this.newRecycler.date.startTime === undefined ||
      this.newRecycler.date.endTime === undefined ||
      this.newRecycler.date.startTime > this.newRecycler.date.endTime ||
      this.newRecycler.gender === undefined ||
      this.age === undefined || this.age.length === 0;
  }

  tmpPhoto() {
    if (!this.tmp_image) {
      this.recyclerPhoto(this.newRecycler.gender);
      //console.log(this.newRecycler.gender);
    }
  }

  loginRedirect() {
    this.navCtrl.push(LoginPage);
  }

  takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options)
        .then((imageData) => {
          console.log("IMAGE DATA", imageData);
          this.tmp_image = 'data:image/jpeg;base64,' + imageData;
          // this.tmp_image = file_uri;
        })
        .catch((e) => {
          console.log(e);
          this.tmp_image = undefined;
        });
    }
    catch (e) {
      console.log(e);
      this.tmp_image = undefined;
    }
  }

  //function add a image when user not take photo
  recyclerPhoto(gender = null) {
    //console.log(gender);
    if (gender === null || gender === 'Mujer') {
      this.default_image = 'assets/imgs/recycler_women.png';
    } else {
      this.default_image = 'assets/imgs/recycler_men.png';
    }
  }
}