import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialNetworksPage } from './social-networks';

@NgModule({
  declarations: [
    SocialNetworksPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialNetworksPage),
  ],
})
export class SocialNetworksPageModule {}
