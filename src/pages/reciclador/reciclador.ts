import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, DateTime } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';
import { AuthenticationService } from '../../services/authenticationService';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { PointsPage } from '../points/points';

@IonicPage()
@Component( {
  selector: 'page-reciclador',
  templateUrl: 'reciclador.html'
} )


export class RecicladorPage {
  siguiendo : boolean = false;
  notificacion : boolean = false;
  id = null;
  iduser = null;

  recycler : any;

  lat : any;
  lng : any;

  latView : any;
  lngView : any;

  zoom : any;

  // values by default
  latViewDef: any = -0.184713;
  lngViewDef: any = -78.484771;
  zoomDef: any = 16;

  constructor( public navCtrl : NavController, public navParams : NavParams, public toastCtrl : ToastController, public RecicladorSrv : ReciappService, public callNumber : CallNumber, private alertCtrl : AlertController, public authService : AuthenticationService, private geolocation : Geolocation, private platform : Platform, private locationAccuracy : LocationAccuracy,
               private diagnostic : Diagnostic ) {

    const thisYear = ( new Date() ).getFullYear();

    this.recycler = navParams.get( 'recycler' );
    this.recycler.age = thisYear - this.recycler.yearBirth;
    this.recycler.recyclingFor = thisYear - this.recycler.yearStartRecycling
;
    //console.log(this.recycler.recyclingFor);


    let user = new Object( this.recycler.favoriteUsers );

    if( this.authService.isAuthenticated() ) {
      this.iduser = this.authService.getCurrentUser().uid;
      this.siguiendo = user.hasOwnProperty( this.iduser );
    } else {
      console.log( 'sin sesion' );
    }

    if( this.platform.is( 'ios' ) ) {
      this.locationAccuracy.canRequest().then(
        ( canRequest : boolean ) => {
          if( canRequest ) {
            this.locationAccuracy.request( this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY ).then(
              () => {
                this.verifyGps();
                this.getMyLocation();
              },
              error => {
                //this.valuesByDefault();
              }
            );
          }
        } );
    } else if( this.platform.is( 'android' ) ) {
      this.diagnostic.isGpsLocationEnabled()
        .then( ( enabled ) => {
          if( enabled ) {
            this.getMyLocation();
          } else {
            this.presentConfirm( 'Encender su GPS por favor' );
          }
        } );
    }
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad RecicladorPage' );
  }


  seguir( id ) : void {
    if( this.siguiendo ) {
      this.siguiendo = false;
      this.dejarReciclador( id );
    } else {
      this.siguiendo = true;
      this.notificacion = true;
      this.seguirReciclador( id );
    }
  }

  notification( name ) : void {
    console.log( name );
    if( this.notificacion ) {
      this.notificacion = false;
      this.notificacionDesactivada();
    } else {
      this.notificacion = true;
      this.notificacionActivada();
    }
  }

  async seguirReciclador( id ) {
    let toast = this.toastCtrl.create( {
      message: 'Ahora estas siguiendo a ' + this.recycler.name + '.',
      duration: 3000,
      position: 'top'
    } );
    try {
      this.RecicladorSrv.putLoveRecicler( id, this.iduser )
        .then( () => {
          const subsPoints = this.RecicladorSrv.checkPointsFirstFavorite( this.iduser )
            .subscribe( ( points ) => {
              subsPoints.unsubscribe();
              if( points === 0 ) {
                this.RecicladorSrv.assignPointsFirstFavorite( this.iduser )
                  .then( () => {
                    this.navCtrl.push( PointsPage,
                      {
                        points: 50,
                        message: 'Has ganado los puntos por marcar a tu primer reciclador favorito. Ahora puedes empezar a hacer entregas.'
                      } );
                    return;
                  } );
              } else {
                toast.present();
              }
            } );
        } );
    } catch( error ) {
      console.log( error );
    }
  }

  async dejarReciclador( id ) {
    let toast = this.toastCtrl.create( {
      message: 'Dejaste de seguir a ' + this.recycler.name + '.',
      duration: 3000,
      position: 'top'
    } );
    try {
      const result = await this.RecicladorSrv.removeLoveRecicler( id, this.iduser );
      if( result ) {
        toast.present();
      }
    } catch( error ) {
      console.log( error );
    }
  }

  getMyLocation() {
    this.geolocation.getCurrentPosition().then( ( resp ) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.latView = resp.coords.latitude;
      this.lngView = resp.coords.longitude;
      this.zoom = 16;
    } ).catch( ( error ) => {
      console.log( 'Error getting location', error );
    } );
  }

  verifyGps() {
    this.diagnostic.isLocationAuthorized()
      .then( ( appAutorized ) => {
        if( appAutorized ) {
          this.diagnostic.isLocationEnabled()
            .then( ( enabled ) => {
              if( enabled ) {
                this.getMyLocation();
              } else {
                this.presentConfirm( 'Encender su GPS por favor' );
              }
            } );
        } else {
          this.diagnostic.requestLocationAuthorization( 'always' )
            .then( () => {
              this.getMyLocation();
            } );
        }
      } );
  }

  presentConfirm( message ) {
    let alert = this.alertCtrl.create( {
      title: 'Ubicación',
      message: message
    } );
    alert.present();
  }

  notificacionActivada() {
    let toast = this.toastCtrl.create( {
      message: 'Te llegara información sobre ' + this.recycler.name + '.',
      duration: 3000,
      position: 'top'
    } );
    toast.present();
  }

  notificacionDesactivada() {
    let toast = this.toastCtrl.create( {
      message: 'Haz desactivado las notificaciones.',
      duration: 3000,
      position: 'top'
    } );
    toast.present();
  }

  doCallNumber( phoneNumber : string ) {
    let alert = this.alertCtrl.create( {
      title: 'Llamada',
      message: 'Desea realizar la llamada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log( 'Cancel clicked' );
          }
        },
        {
          text: 'Llamar',
          handler: () => {
            this.callNumber.callNumber( phoneNumber, true )
              .then( res => console.log( 'Launched dialer!', res ) )
              .catch( err => console.log( 'Error launching dialer', err ) );
          }
        }
      ]
    } );
    alert.present();
  }

  getAgefromYear( year : any ) : any {
    let yearNow : number = ( new Date() ).getFullYear();
    return ( yearNow - year );
  }

  createrSpace(days: any) :any{
    let data:any = days.join(', ')
    return data
  }

  getYears(year : number) :any{
    if (year > 1){
      return year.toString() + " años"
    }else{
      return year.toString() + " año"
    }
  }


  dismiss(){
    this.navCtrl.pop();
  }

}
