import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReciappService } from '../../services/reciapp.service';

import { DashboardPage } from '../dashboard/dashboard';
import { CategoryPage } from '../category/category';

@IonicPage()
@Component( {
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html'
} )
export class SubcategoryPage {

  subcategories : any;
  categoryName : any;
  categoryClass : any;

  constructor( public navCtrl : NavController, public navParams : NavParams, public categorySrv : ReciappService, public subcategoriesSrv : ReciappService ) {
    this.categoryName = navParams.get( 'categoryName' );
    this.subcategories = navParams.get( 'subcategories' );
    this.categoryClass = navParams.get( 'categoryClass' );
    //console.log("PARAAM ID",this.id);
    // this.category=categorySrv.getCategoryById(this.id);
    // console.log("DET CATEGORY", this.category);
    // this.subcategories=subcategoriesSrv.getSubcategory(this.id).valueChanges();
    console.log( this.subcategories );

  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad SubcategoryPage' );
  }

}
