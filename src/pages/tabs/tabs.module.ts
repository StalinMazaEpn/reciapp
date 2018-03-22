import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild({
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
  	}),
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
