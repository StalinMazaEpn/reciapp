import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecicladorPage } from './reciclador';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    RecicladorPage,
  ],
  imports: [
    IonicPageModule.forChild(RecicladorPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY'
    })
  ],
})
export class RecicladorPageModule {}
