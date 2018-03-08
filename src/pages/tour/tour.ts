import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.colornav = "tourOne";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourPage');
    this.indexPages = 0;
  }

  nextSlide(){
    console.log('next');
    this.slides.slideNext();
  }
  prevlide(){
    console.log('prev');
    this.slides.slidePrev();
  }

  slideChanged() {
    this.changeColors();
    if(this.slides.getActiveIndex()!= 0 && this.slides.getActiveIndex().toString() != (this.slides.length()-1).toString()){
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
    this.colornav = this.colors[this.indexPages];
    console.log(this.colornav);
  }

  startApp(){
    localStorage.setItem('tourDone','true');
    this.navCtrl.setRoot(TabsPage);
  }

}
