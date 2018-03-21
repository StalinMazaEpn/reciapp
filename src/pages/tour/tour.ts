import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

/**
 * Generated class for the TourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tour',
  templateUrl: 'tour.html',
})
export class TourPage {

  @ViewChild(Slides) slides: Slides;

  slideCount: number= 1;

  showFirst:boolean = false;
  showEnd:boolean = true;
  showAtEnd:boolean = false;
  colornav:string;

  colors:any = ["tourOne","tourTwo","tourThree","tourFour"];
  indexPages:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser, private appAvailability: AppAvailability, private platform: Platform) {
    this.colornav = "tourOne";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourPage');
    this.indexPages = 0;
  }
  ionViewDidLeave(){
   this.navCtrl.popToRoot();
  }

  nextSlide(){
    console.log('next');
    this.slides.slideNext();
  }
  prevlide(){
    console.log('prev');
    this.slides.slidePrev();
  }

  slideDidChanged() {
    this.changeColors();
  }
  slideWillChanged() {
    if(this.slides.getActiveIndex() > 0 && !this.slides.isEnd()){
      this.showFirst = true;
      this.showEnd = true;
      this.showAtEnd = false;
    }
  }

  slideAtEnd(){
    this.changeColors();
    this.showFirst = true;
    this.showEnd = false;
    this.showAtEnd = true;
  }

  slideAtBegin(){
    this.showFirst = false;
    this.showEnd = true;
    this.showAtEnd = false;
  }

  changeColors(){
    this.indexPages = this.slides.getActiveIndex();
    if(this.indexPages <= 3){
      this.colornav = this.colors[this.indexPages];
    }
  }

  startApp(){
    localStorage.setItem('tourDone','true');
    this.navCtrl.setRoot(TabsPage);
  }

  goToReciVeciPageFb(){
    this.openAppOrBrowser('fb://', 'com.facebook.katana', 'fb://page/', 'https://www.facebook.com/', '1670903246525234');
    console.log(this.openAppOrBrowser('fb://', 'com.facebook.katana', 'fb://page/', 'https://www.facebook.com/', '1670903246525234'));
  }
  goToReciVeciPageTwit(){
    this.openAppOrBrowser('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', 'reciveci');
  }
  goToReciVeciPageInst(){
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
        const browser = this.iab.create(appUrl+username,'_system');
        browser.show();
      },
      (no: boolean) => {
        const browser = this.iab.create(httpUrl+username);
        browser.show();
      }
    );
  }

}
