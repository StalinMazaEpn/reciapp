import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReciappService } from '../services/reciapp.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Tour1PageModule } from '../pages/tour1/tour1.module';
import { Tour2PageModule } from '../pages/tour2/tour2.module';
import { Tour3PageModule } from '../pages/tour3/tour3.module';
import { Tour4PageModule } from '../pages/tour4/tour4.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { EntregaPageModule } from '../pages/entrega/entrega.module';
import { RecicladorPageModule } from '../pages/reciclador/reciclador.module';
import { CategoriaPageModule } from '../pages/categoria/categoria.module';
import { DetallePageModule } from '../pages/detalle/detalle.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';

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
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    Tour1PageModule,
    Tour2PageModule,
    Tour3PageModule,
    Tour4PageModule,
    InicioPageModule,
    DashboardPageModule,
    EntregaPageModule,
    RecicladorPageModule,
    CategoriaPageModule,
    DetallePageModule,
    TabsPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ReciappService,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
