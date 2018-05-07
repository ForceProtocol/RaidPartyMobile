import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPage } from './modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPage),
    TranslateModule.forChild()
  ],
})
export class ModalPageModule {}
