import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { DeliveryPage } from './delivery';

@NgModule({
  declarations: [
    DeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPage),
    IonicModule.forRoot(DeliveryPage,{
    	tabsHideOnSubPages: true,
    }),
  ],
})
export class DeliveryPageModule {}
