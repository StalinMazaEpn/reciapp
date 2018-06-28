import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RecyclerFormPage } from '../recycler-form/recycler-form';
import { ReciappService } from '../../services/reciapp.service';
import { AuthenticationService } from '../../services/authenticationService';
import { storage, database } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DashboardPage } from '../dashboard/dashboard';
import { PointsPage } from '../points/points';

@IonicPage()
@Component( {
  selector: 'page-delivery',
  templateUrl: 'delivery.html'
} )
export class DeliveryPage {
  isAuthenticated : boolean;
  uid : any;
  recyclers : any;
  tmpPhoto : any = null;
  tmpRecyclerImage = 'assets/imgs/menos.png';
  tmpRecyclerName = null;
  tmpRecyclerLastName=null;
  tmpRecyclerFirstLetterName : any;

  recyclablePhoto : any = null;
  recyclerId : any;
  plasticoCtrl : any;
  papelCtrl : any;
  chatarraCtrl : any;
  vidrioCtrl : any;
  compuestoCtrl : any;
  cartonCtrl : any;
  fundaCtrl : any;

  selRecycler : any;
  tmp_selRecycler : any;
  error : boolean;
  errorForm : boolean;

  userDelivery : any = {
    fundaCtrl: undefined,
    delivery: {
      plastico: undefined,
      papel: undefined,
      chatarra: undefined,
      vidrio: undefined,
      compuesto: undefined,
      carton: undefined
    }
  };

  tmpDate;
  date;
  hideFavorites : boolean = false;
  totalMaterialRecyclable : number = 0;
  errTotalMaterialRecyclable : boolean;
  errorSize : boolean;
  errorRecycler : boolean;
  disabledBtnDelivery : boolean;

  auxPhoto : boolean = false;
  auxSelRecycler : boolean = false;
  auxMaterial : boolean = false;

  disabledBtn:boolean;
  constructor( public navCtrl : NavController, public navParams : NavParams, public authenticationService : AuthenticationService,
               private camera : Camera, public userSrv : ReciappService, public toastCtrl : ToastController ) {
    this.disabledBtnDelivery = true;
    this.error = false;

    this.tmpPhoto = 'assets/imgs/transparent.png';

    if( this.authenticationService.getCurrentUser() != null ) {
      this.isAuthenticated = this.authenticationService.isAuthenticated();
      this.uid = this.authenticationService.getCurrentUser().uid;
      this.recyclers = this.userSrv.getFavoritiesRecycler( this.uid )
        .map( ( recyclerId ) => {
          return recyclerId.map( recyclerObj => {
            return this.userSrv.getRecyclerById( recyclerObj.payload.key );
          } );
        } );
    }
    this.tmpDate = new Date();
    this.date = this.tmpDate.getFullYear() + '' + this.tmpDate.getMonth() + '' + this.tmpDate.getDay() + '' + this.tmpDate.getHours() + '' + this.tmpDate.getMinutes() + '' + this.tmpDate.getSeconds() + '' + this.tmpDate.getMilliseconds();
  }

  ngAfterViewInit() {
    let tabs = document.querySelectorAll( '.show-tabbar' );
    if( tabs !== null ) {
      Object.keys( tabs ).map( ( key ) => {
        tabs[ key ].style.display = 'none';
      } );
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll( '.show-tabbar' );
    if( tabs !== null ) {
      Object.keys( tabs ).map( ( key ) => {
        tabs[ key ].style.display = 'flex';
      } );

    }
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad DeliveryPage' );
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  ionViewWillEnter() {

    let tabs = document.querySelectorAll( '.show-tabbar' );
    if( tabs !== null ) {
      Object.keys( tabs ).map( ( key ) => {
        tabs[ key ].style.display = 'none';
      } );
    }


    // document.getElementsByClassName('tabbar').
    this.cleanForm();
    this.showFavorites();
    this.disabledBottomDelivery();
    this.isAuthenticated = this.authenticationService.isAuthenticated();

    if( this.authenticationService.getCurrentUser() != null ) {
      this.uid = this.authenticationService.getCurrentUser().uid;
      this.recyclers = this.userSrv.getFavoritiesRecycler( this.uid )
        .map( ( recyclerId ) => {
          return recyclerId.map( recyclerObj => {
            return this.userSrv.getRecyclerById( recyclerObj.payload.key );
          } );
        } );
    }
  }

  takePhoto() {
    this.error=false;
    try {
      const options : CameraOptions = {
        quality: 100,
        targetHeight: 600,
        targetWidth: 600,
        cameraDirection:this.camera.Direction.BACK,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      };
      this.recyclablePhoto = this.camera.getPicture( options )
        .then( ( resp ) => {
          this.tmpPhoto = 'data:image/jpeg;base64,' + resp;
          //console.log(this.tmpPhoto);
          this.auxPhoto = true;
          this.disabledBottomDelivery();
          this.validation();
        } )
        .catch( ( e ) => {
          console.log( e );
          this.recyclablePhoto = null;
          this.disabledBtnDelivery = true;
        } );
    }
    catch( e ) {
      console.log( e );
      this.recyclablePhoto = null;
    }
  }

  validation(){

    //VALIDATE PHOTO
    if (this.tmpPhoto !== undefined && this.tmpPhoto != 'assets/imgs/transparent.png') {
      //ok
      this.error=true;
    }else{
      this.error=false;
    }

    //VALIDATE SELECT RECYCLER
    if (( this.tmp_selRecycler == undefined && this.recyclerId == undefined ) && ( this.tmp_selRecycler == undefined || this.recyclerId == undefined )) {
      this.errorRecycler=false;
    }else{
      //ok
      this.errorRecycler=true;
    }

    //VALIDATE PLASTIC SLEEVE
    if (this.fundaCtrl != null && this.fundaCtrl != undefined && this.fundaCtrl != 0) {
      //ok
      this.errorSize=true;
    }else{
      this.errorSize=false;
    }

    //VALIDATE MATERIAL RANGE
    if (this.totalMaterialRecyclable==100 && this._totalMaterialRecyclable==100) {
      //ok
      this.errorForm=true;
    }else{
      this.errorForm=false;
    }
    this.disabledBottomDelivery();
  }

  disabledBottomDelivery() {
    console.log( 'HABILITANDO' );
    this.disabledBtnDelivery = true;
    if( this.error && this.errorRecycler && this.errorSize && this.errorForm) {
      this.disabledBtnDelivery = false;
    } else {
      this.disabledBtnDelivery = true;
    }
  }

  delivery() {
    this.disabledBtn=true;
    this.tmpDate = new Date();
    this.date = this.tmpDate.getFullYear() + '' + this.tmpDate.getMonth() + '' + this.tmpDate.getDay() + '' + this.tmpDate.getHours() + '' + this.tmpDate.getMinutes() + '' + this.tmpDate.getSeconds() + '' + this.tmpDate.getMilliseconds();

    if( this.fundaCtrl != null && this.fundaCtrl != undefined && this.fundaCtrl != 0 ) {
      //this.errorSize = false;
      if( ( this.tmp_selRecycler == undefined && this.recyclerId == undefined ) && ( this.tmp_selRecycler == undefined || this.recyclerId == undefined ) ) {
        //console.log('error al seleccionar un reciclador o anonimo');
        this.errorRecycler = true;
      } else {
        this.errorRecycler = false;
        //Validate data
        if( this.recyclerId != null && ( this.plasticoCtrl != null && this.plasticoCtrl != undefined && this.plasticoCtrl != 0 ||
            this.papelCtrl != null && this.papelCtrl != undefined && this.papelCtrl != 0 ||
            this.vidrioCtrl != null && this.vidrioCtrl != undefined && this.vidrioCtrl != 0 ||
            this.compuestoCtrl != null && this.compuestoCtrl != undefined && this.compuestoCtrl != 0 ||
            this.chatarraCtrl != null && this.chatarraCtrl != undefined && this.chatarraCtrl != 0 ||
            this.cartonCtrl != null && this.cartonCtrl != undefined && this.cartonCtrl != 0 ) ) {
          this.errorForm = false;
          if( this._totalMaterialRecyclable > 0 && this._totalMaterialRecyclable <= 100 ) {
            //When user select a recycler
            this.userDelivery.idUser = this.uid;
            this.userDelivery.idRecycler = this.recyclerId;
            //Tomamos la hora del servidor (Arreglo)
            //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
            //Tomamos la hora del servidor (Métodos)
            this.userDelivery.date = database.ServerValue.TIMESTAMP;
            this.rangeData();
            //console.log(this.tmpPhoto);
            //Storage photo

            if( this.tmpPhoto !== undefined && this.tmpPhoto != 'assets/imgs/transparent.png' ) {
              //Storage on firebase
              const pictures = storage().ref( 'deliveries/' + this.userDelivery.idUser + '/' + this.date + '.jpeg' );
              pictures.putString( this.tmpPhoto, 'data_url' )
                .then( ( snapshot ) => {
                  // Upload completed successfully, now we can get the download URL
                  this.userDelivery.image = snapshot.downloadURL;
                  console.log( 'Entrega', this.userDelivery.idRecycler );
                  //function to save on firebase
                  this.userSrv.addNewDelivery( this.userDelivery )
                    .then( () => {
                      this.disabledBtn=false;
                      console.log( 'ok' );
                      //document.getElementById(this.recyclerId).style.border="0";
                      this.cleanForm();
                      //this.addDeliveryPoints();
                      this.navCtrl.push(PointsPage, {points : 60, message: "Esta información será validada en los próximos días."});
                    } )
                    .catch( ( e ) => {
                      console.log( 'Hubo un error', e );
                    } );
                } )
                .catch( ( error ) => {
                  //this.buttonDisabled = false;
                  console.log( 'NOT UPLOADED', error );
                  this.error = true;
                } );
            } else {
              console.log( 'REGISTER NO PHOTO' );
              this.error = true;
            }
          } else {
            this.errTotalMaterialRecyclable = true;
          }

        } else if( this.recyclerId == null && this.tmp_selRecycler === 'Anónimo' && ( this.plasticoCtrl != null && this.plasticoCtrl != undefined && this.plasticoCtrl != 0 ||
            this.papelCtrl != null && this.papelCtrl != undefined && this.papelCtrl != 0 ||
            this.vidrioCtrl != null && this.vidrioCtrl != undefined && this.vidrioCtrl != 0 ||
            this.compuestoCtrl != null && this.compuestoCtrl != undefined && this.compuestoCtrl != 0 ||
            this.chatarraCtrl != null && this.chatarraCtrl != undefined && this.chatarraCtrl != 0 ||
            this.cartonCtrl != null && this.cartonCtrl != undefined && this.cartonCtrl != 0 ) ) {
          this.errorForm = false;
          if( this._totalMaterialRecyclable > 0 && this._totalMaterialRecyclable <= 100 ) {
            //When user not select a recycler
            this.userDelivery.idUser = this.uid;
            this.userDelivery.idRecycler = null;
            //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
            this.userDelivery.date = database.ServerValue.TIMESTAMP;
            this.rangeData();
            //Storage photo

            if( this.tmpPhoto !== undefined && this.tmpPhoto != 'assets/imgs/transparent.png' ) {
              //Storage on firebase
              const pictures = storage().ref( 'deliveries/' + this.userDelivery.idUser + '/' + this.date + '.jpeg' );
              pictures.putString( this.tmpPhoto, 'data_url' )
                .then( ( snapshot ) => {
                  // Upload completed successfully, now we can get the download URL
                  this.userDelivery.image = snapshot.downloadURL;
                  //function to save on firebase
                  this.userSrv.addNewDelivery( this.userDelivery )
                    .then( () => {
                      console.log( 'ok Anónimo', this.userDelivery );
                      //document.getElementById('anonymousRecycler').style.border="0";
                      this.cleanForm();
                      this.addDeliveryPoints();
                      this.navCtrl.push(PointsPage, {points : 60, message: "Esta información será validada en los próximos días."});
                    } )
                    .catch( ( e ) => {
                      console.log( 'Hubo un error Anónimo', e );
                    } );
                } )
                .catch( ( error ) => {
                  //this.buttonDisabled = false;
                  console.log( 'NOT UPLOADED', error );
                } );

            } else {
              console.log( 'REGISTER NO PHOTO' );
              this.error = true;
            }
          } else {
            this.errTotalMaterialRecyclable = true;
          }

        } else {
          console.log( 'falta llenar campos' );
          this.errorForm = true;
        }
      }
    } else {
      this.errorSize = true;
      console.log( 'error al escoger tamaño de la funda' );
    }

  }

  cleanForm() {
    //document.getElementById('anonymousRecycler').style.border="0";
    this.userDelivery.idRecycler = null;
    this.userDelivery.fundaCtrl = null;
    this.recyclerId = null;
    this.plasticoCtrl = null;
    this.papelCtrl = null;
    this.vidrioCtrl = null;
    this.compuestoCtrl = null;
    this.chatarraCtrl = null;
    this.cartonCtrl = null;
    this.fundaCtrl = null;
    this.uid = this.authenticationService.getCurrentUser().uid;
    this.error = false;
    this.errorSize = false;
    this.errTotalMaterialRecyclable = false;
    this.tmpPhoto = 'assets/imgs/transparent.png';
    this.recyclablePhoto = null;
    console.log( this.date );
    //SHOW Favorites
    this.hideFavorites = false;
    this.tmp_selRecycler = undefined;
    this.recyclerId = undefined;
    this.auxSelRecycler = false;
    //disabled butom
    this.disabledBtnDelivery = true;
    this.disabledBtn = false;
  }

  //Function to assign
  rangeData() {
    if( this.fundaCtrl != null && this.fundaCtrl != undefined ) {
      this.userDelivery.fundaCtrl = this.fundaCtrl;
      console.log( this.fundaCtrl );
    } else {
      this.userDelivery.fundaCtrl = null;
      console.log( this.fundaCtrl );
    }

    if( this.plasticoCtrl != null && this.plasticoCtrl != undefined ) {
      this.userDelivery.delivery.plastico = this.plasticoCtrl;
    } else {
      this.userDelivery.delivery.plastico = null;
    }

    if( this.papelCtrl != null && this.papelCtrl != undefined ) {
      this.userDelivery.delivery.papel = this.papelCtrl;
    } else {
      this.userDelivery.delivery.papel = null;
    }

    if( this.vidrioCtrl != null && this.vidrioCtrl != undefined ) {
      this.userDelivery.delivery.vidrio = this.vidrioCtrl;
    } else {
      this.userDelivery.delivery.vidrio = null;
    }

    if( this.compuestoCtrl != null && this.compuestoCtrl != undefined ) {
      this.userDelivery.delivery.compuesto = this.compuestoCtrl;
    } else {
      this.userDelivery.delivery.compuesto = null;
    }

    if( this.chatarraCtrl != null && this.chatarraCtrl != undefined ) {
      this.userDelivery.delivery.chatarra = this.chatarraCtrl;
    } else {
      this.userDelivery.delivery.chatarra = null;
    }

    if( this.cartonCtrl != null && this.cartonCtrl != undefined ) {
      this.userDelivery.delivery.carton = this.cartonCtrl;
    } else {
      this.userDelivery.delivery.carton = null;
    }
  }

  goToLogin() {
    this.navCtrl.push( LoginPage );
  }

  addRecycler() {
    this.navCtrl.push( RecyclerFormPage );
  }

  selectRecycler( recyclerId ) {
    //hide section
    this.hideFavorites = true;

    if( this.recyclerId != null ) {
      document.getElementById( this.recyclerId ).style.border = '0';
    }

    if( recyclerId === 'Anónimo' ) {
      this.tmp_selRecycler = 'Anónimo';
      //console.log("Anónimo",recyclerId);
      this.selRecycler = '1px solid green';
      //console.log(this.selRecycler);
      document.getElementById( 'anonymousRecycler' ).style.border = this.selRecycler;
      if( this.recyclerId != null ) {
        document.getElementById( this.recyclerId ).style.border = '0';
        this.recyclerId = null;
      }
      this.tmpRecyclerImage = 'assets/imgs/menos.png';
      this.auxSelRecycler = true;
      this.disabledBottomDelivery();
      this.validation();
    } else {
      //margin
      this.tmp_selRecycler = null;
      document.getElementById( 'anonymousRecycler' ).style.border = '0';
      this.recyclerId = recyclerId;
      this.selRecycler = '1px solid green';
      //console.log(this.selRecycler);
      document.getElementById( recyclerId ).style.border = this.selRecycler;
      this.userSrv.getRecyclerById( recyclerId ).subscribe( data => {
        this.tmpRecyclerImage = data[ 'image' ];
        this.tmpRecyclerName = data[ 'name' ];
        this.tmpRecyclerLastName = data[ 'lastName' ];
        this.tmpRecyclerFirstLetterName = this.tmpRecyclerName.charAt( 0 ).toUpperCase();
      } );
      this.auxSelRecycler = true;
      this.disabledBottomDelivery();
      this.validation();
    }

    //show only recycler
    //this.tmpRecycler=this.userSrv.getRecyclerById(recyclerId);

  }

  addDeliveryPoints() {
    let toast = this.toastCtrl.create( {
      message: 'Haz ganado 60 puntos, por realizar una entrega.',
      duration: 3000,
      position: 'top'
    } );
    toast.present();
  }

  aux1 = 0;
  aux2 = 0;
  aux3 = 0;
  aux4 = 0;
  aux5 = 0;
  aux6 = 0;
  _totalMaterialRecyclable : number = 0;
  btnDisabled : boolean = false;

  totalMaterial( number, name ) {

    switch( name ) {
      case 'plastico':
        this.aux1 = number;
        //console.log('plastico',this.aux1);
        break;

      case 'papel':
        this.aux2 = number;
        //console.log('papel',this.aux2);
        break;

      case 'vidrio':
        this.aux3 = number;
        //console.log('vidrio',this.aux3);
        break;

      case 'compuesto':
        this.aux4 = number;
        //console.log('compuesto',this.aux4);
        break;

      case 'chatarra':
        this.aux5 = number;
        //console.log('chatarra',this.aux5);
        break;

      case 'carton':
        this.aux6 = number;
        //console.log('chatarra',this.aux5);
        break;
    }
    if( ( this.totalMaterialRecyclable = this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6 ) >= 100 ) {
      this._totalMaterialRecyclable = this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6;
      this.totalMaterialRecyclable = 100;
      console.log( 'La funda ya esta llena' );
    } else if( ( this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6 ) > 0 && ( this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6 ) <= 100 ) {
      this._totalMaterialRecyclable = this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6;
      this.totalMaterialRecyclable = this.aux1 + this.aux2 + this.aux3 + this.aux4 + this.aux5 + this.aux6;
      this.validation();
      this.auxMaterial = true;
    }
  }

  showFavorites() {
    this.hideFavorites = false;
    this.tmp_selRecycler = undefined;
    this.recyclerId = undefined;
    this.auxSelRecycler = false;
    this.validation();
  }

  cancelDelivery() {
    this.navCtrl.parent.select(0);
  }

  
}
