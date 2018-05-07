import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPage } from './reset';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResetPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPage),
    TranslateModule.forChild()
  ],
})
export class ResetPageModule {}
