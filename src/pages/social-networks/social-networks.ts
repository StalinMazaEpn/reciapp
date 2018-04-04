import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

/**
 * Generated class for the SocialNetworksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-networks',
  templateUrl: 'social-networks.html',
})
export class SocialNetworksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer, private iab: InAppBrowser, private appAvailability: AppAvailability, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialNetworksPage');
  }

  sendEmail(){

    console.log("hola");
    let email = {
      to: 'info@reciveci.ec',
      subject: 'ReciVeci Correo',
      body: 'Escribe a continuación tus inquietudes:',
      isHtml: true
    };

        this.emailComposer.open(email);
  }

  goFacebook(){
    /*const browser = this.iab.create('https://www.facebook.com/reciveci/');
    browser.show();*/
    this.openAppOrBrowser('fb://', 'com.facebook.katana', 'fb://page/', 'https://www.facebook.com/', '1670903246525234');
  }

  goTwitter(){
    this.openAppOrBrowser('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', 'reciveci');
  }

  goInstagram(){
    this.openAppOrBrowser('instagram://', 'com.instagram.android', 'instagram://user?username=', 'https://www.instagram.com/', 'reciveci');
  }

  openAppOrBrowser(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string){
    let app;
    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    }

    this.appAvailability.check(app)
    .then(
      (yes: boolean) => {
        window.open(appUrl+username, '_system', 'location=no');
      },
      (no: boolean) => {
        const browser = this.iab.create(httpUrl+username);
        browser.show();
      }
    );
  }


}
