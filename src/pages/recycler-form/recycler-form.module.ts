import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecyclerFormPage } from './recycler-form';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    RecyclerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RecyclerFormPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY'
    }),
  ],
})
export class RecyclerFormPageModule {}
