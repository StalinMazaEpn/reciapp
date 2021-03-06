 import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,IonicPageModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReciappService } from '../services/reciapp.service';
import { MyApp } from './app.component';

import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { MapPageModule } from '../pages/map/map.module';
import { RecicladorPageModule } from '../pages/reciclador/reciclador.module';
import { CategoryPageModule } from '../pages/category/category.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { TourPageModule } from './../pages/tour/tour.module';
import { LoginPageModule } from './../pages/login/login.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { SocialNetworksPageModule } from '../pages/social-networks/social-networks.module';
import { RecyclerFormPageModule } from './../pages/recycler-form/recycler-form.module';
import { DeliveryPageModule } from '../pages/delivery/delivery.module';
import { ExchangePageModule } from '../pages/exchange/exchange.module';
import { ModalPageModule } from '../pages/modal/modal.module';
import { PointsPageModule } from '../pages/points/points.module';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { TourPage } from '../pages/tour/tour';
import { SocialNetworksPage } from '../pages/social-networks/social-networks';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import {AuthenticationService} from "../services/authenticationService";
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
 import { CouponModalPageModule } from '../pages/couponModal/couponModal.module';
 import { SubcategoryPageModule } from '../pages/subcategory/subcategory.module';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2qXD-AALuipF57RmPcbq25S-eIjb3TKs",
  authDomain: "reciveci-app.firebaseapp.com",
  databaseURL: "https://reciveci-app.firebaseio.com",
  projectId: "reciveci-app",
  storageBucket: "reciveci-app.appspot.com",
  messagingSenderId: "138367459115"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
   IonicPageModule.forChild({
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp, {backButtonText: '', tabsHideOnSubPages: true }),
    DashboardPageModule,
    MapPageModule,
    RecicladorPageModule,
    CategoryPageModule,
    SubcategoryPageModule,
    TabsPageModule,
    TourPageModule,
    LoginPageModule,
    RegisterPageModule,
    SocialNetworksPageModule,
    RecyclerFormPageModule,
    DeliveryPageModule,
    ExchangePageModule,
    ModalPageModule,
    PointsPageModule,
    CouponModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TourPage,
    SocialNetworksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ReciappService,
    FirebaseProvider,
    NativeStorage,
    Geolocation,
    EmailComposer,
    InAppBrowser,
    AppAvailability,
    Camera,
    AuthenticationService,
    CallNumber,
    LocationAccuracy,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
