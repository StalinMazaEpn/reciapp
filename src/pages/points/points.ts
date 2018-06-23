import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component( {
  selector: 'page-points',
  templateUrl: 'points.html'
} )
export class PointsPage {
  points : number;
  message : string;

  constructor( public navCtrl : NavController, public navParams : NavParams ) {
    this.points = this.navParams.get('points');
    this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad PointsPage' );
  }

}
