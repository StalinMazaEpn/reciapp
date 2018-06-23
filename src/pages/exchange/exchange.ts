import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';
import { AuthenticationService } from '../../services/authenticationService';
import { ModalPage } from '../modal/modal';
import moment from 'moment';
import { Coupon } from '../../models/coupon';
import { CouponModalPage } from '../couponModal/couponModal';

/**
 * Generated class for the ExchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-exchange',
  templateUrl: 'exchange.html'
} )
export class ExchangePage {

  exchangeList;
  activeCoupons = [];
  userPts;
  userName;
  userData;

  constructor( public navCtrl : NavController, public navParams : NavParams, public userSrv : ReciappService, public modalCtrl : ModalController,
               public authSrv : AuthenticationService ) {
    const uid = this.authSrv.getCurrentUser().uid;
    this.userSrv.getUser( uid ).subscribe( ( data ) => {
      this.userData = data;
      this.userPts = data[ 'points' ][ 'total' ];
      this.userName = data[ 'name' ];
    } );
    //this.userData=this.navParams.get('userData');
    //this.userPts=this.userData.points.total;
    //this.userName=this.userData.name;


    this.userSrv.getActiveCouponsByUser( uid )
      .subscribe( ( coupons ) => {
        // console.log( 'COUPONS', coupons );
        coupons.forEach( ( coupon : Coupon ) => {
          if( moment( coupon.date ).add( 24, 'hours' ).isAfter( moment() ) ) {
            this.activeCoupons.push( { id: coupon.exchange.id, date: coupon.date } );
          }
          // console.log( 'ACTIVE COUPONS', this.activeCoupons );
          // console.log( coupon.date );

        } );

        this.userSrv.getExchangeList().subscribe( ( list ) => {
          this.exchangeList = [];
          list.forEach( ( data ) => {
            const exchange = {
              ...data.payload.val(),
              id: data.key
            };
            // console.log( 'EXCHANGE', exchange );

            exchange.isActive = this.activeCoupons.some( ( coupon ) => {
              if( coupon.id === data.key ) {
                exchange.expireDate = moment( coupon.date ).add( 24, 'hours' ).format( 'DD [de] MMMM YYYY HH:mm' );
              }
              return coupon.id === data.key;
            } );

            this.exchangeList.push( exchange );
          } );
        } );
      } );
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad ExchangePage' );
  }

  dismiss() {
    this.navCtrl.pop();
  }

  exchangeModal( objExchange ) {
    //console.log('BEFORE',objExchange);
    let modal = this.modalCtrl.create( ModalPage, { objectExchange: objExchange, userData: this.userData } );
    modal.present();
  }

  couponModal( objExchange ) {
    //console.log('BEFORE',objExchange);
    let modal = this.modalCtrl.create( CouponModalPage, { objectExchange: objExchange, userData: this.userData } );
    modal.present();
  }
}
