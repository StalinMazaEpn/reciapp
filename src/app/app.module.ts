 import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReciappService } from '../services/reciapp.service';

import { MyApp } from './app.component';

import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { EntregaPageModule } from '../pages/entrega/entrega.module';
import { RecicladorPageModule } from '../pages/reciclador/reciclador.module';
import { CategoriaPageModule } from '../pages/categoria/categoria.module';
import { DetallePageModule } from '../pages/detalle/detalle.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { TourPageModule } from './../pages/tour/tour.module';
import { LoginPageModule } from './../pages/login/login.module';
import { RegisterPageModule } from './../pages/register/register.module';
import { SocialNetworksPageModule } from '../pages/social-networks/social-networks.module';

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
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    DashboardPageModule,
    EntregaPageModule,
    RecicladorPageModule,
    CategoriaPageModule,
    DetallePageModule,
    TabsPageModule,
    TourPageModule,
    LoginPageModule,
    RegisterPageModule,
    SocialNetworksPageModule
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
