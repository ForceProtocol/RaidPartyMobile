import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { Globalization } from '@ionic-native/globalization';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild()
  ],
  providers:[
    Globalization
  ]
})
export class SignupPageModule {}
