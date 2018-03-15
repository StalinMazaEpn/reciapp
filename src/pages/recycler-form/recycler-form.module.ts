import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecyclerFormPage } from './recycler-form';

@NgModule({
  declarations: [
    RecyclerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RecyclerFormPage),
  ],
})
export class RecyclerFormPageModule {}
