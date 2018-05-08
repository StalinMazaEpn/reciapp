import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';

import {Geolocation} from '@ionic-native/geolocation';

import {User} from '../../models/user';
import {ReciappService} from '../../services/reciapp.service'
import {Recycler} from '../../models/recycler';
import {LoginPage} from '../login/login';

import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {AuthenticationService} from "../../services/authenticationService";

import firebase from "firebase";
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-recycler-form',
  templateUrl: 'recycler-form.html',
})
export class RecyclerFormPage {

  uid: any;
  //array to get select days
  days: string;
  //Recycler age
  age: any;
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
  daysValidator: AbstractControl;
  hourStart: AbstractControl;
  hourEnd: AbstractControl;
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

    if (this.tmp_image !== undefined) {
      //Storage on firebase
      const pictures = firebase.storage().ref('recicladores/' + this.newRecycler.id + '.jpeg');
      pictures.putString(this.tmp_image, 'data_url')
        .then((snapshot) => {
          // Upload completed successfully, now we can get the download URL
          this.newRecycler.image = snapshot.downloadURL;

          console.log("IAMGE", this.newRecycler.image);
          //Call function to create new recycler
          this.userSrv.addNewRecycler(this.newRecycler.id, this.newRecycler).then(() => {
            //Toast Ok
            this.registerOk();
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
        this.registerOk();
        // this.updatePoints(); // TODO
        //Function to close modal - Form Recycler
        this.dismiss();
      })
        .catch((e) => {
          console.log("ERROR: ", e);
        });
    }

  }

  registerOk() {
    let toast = this.toastCtrl.create({
      message: 'El registro ha sido correcto.',
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  // updatePoints() {
  //   let toast = this.toastCtrl.create({
  //     message: 'Has ganado 100 puntos.',
  //     duration: 2000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }

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
      daysValidator: ['', Validators.required],
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
      gender: ['', Validators.required],
      birth: ['', Validators.required]
    });
    //controls
    this.name = this.formGroup.controls['name'];
    this.daysValidator = this.formGroup.controls['daysValidator'];
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
      this.newRecycler.date.days === undefined ||
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