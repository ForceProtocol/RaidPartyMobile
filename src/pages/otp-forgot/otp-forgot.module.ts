import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpForgotPage } from './otp-forgot';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OtpForgotPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpForgotPage),
    TranslateModule.forChild()
  ],
})
export class OtpForgotPageModule {}
