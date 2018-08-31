import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Delivery_2Page } from './delivery-2';
import { AgmCoreModule } from '@agm/core';
import { ResizableModule } from 'angular-resizable-element';

@NgModule({
  declarations: [
    Delivery_2Page,
  ],
  imports: [
    IonicPageModule.forChild(Delivery_2Page),AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY'
    }),
    ResizableModule,
  ],
})
export class Delivery_2PageModule {}
