import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Tour1PageModule } from '../pages/tour1/tour1.module';
import { Tour2PageModule } from '../pages/tour2/tour2.module';
import { Tour3PageModule } from '../pages/tour3/tour3.module';
import { Tour4PageModule } from '../pages/tour4/tour4.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Tour1PageModule,
    Tour2PageModule,
    Tour3PageModule,
    Tour4PageModule,
    InicioPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
