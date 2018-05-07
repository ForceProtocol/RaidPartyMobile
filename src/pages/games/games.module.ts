import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamesPage } from './games';
import { Clipboard } from '@ionic-native/clipboard';
import { Globalization } from '@ionic-native/globalization';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GamesPage,
  ],
  imports: [
    IonicPageModule.forChild(GamesPage),
    TranslateModule.forChild()
  ],
  providers:[
    Clipboard,
    Globalization
  ]
})
export class GamesPageModule {}
