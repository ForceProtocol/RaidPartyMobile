import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsPage } from './rewards';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsPage),
    TranslateModule.forChild()
  ],
})
export class RewardsPageModule {}
