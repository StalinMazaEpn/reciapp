import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY'
    })
  ],
})
export class MapPageModule {}
