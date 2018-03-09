import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntregaPage } from './entrega';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    EntregaPage,
  ],
  imports: [
    IonicPageModule.forChild(EntregaPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY'
    })
  ],
})
export class EntregaPageModule {}
