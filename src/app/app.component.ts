import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Storage } from '@ionic/storage';
import { SharedService } from '../provider/shared-service';
@Component({
  templateUrl: 'app.html',
  providers: [SharedService]
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private uniqueDeviceID: UniqueDeviceID,
    private storage: Storage,
    public SharedService: SharedService) {
    platform.ready().then(() => {

      // For Get Unique device id and save in localstorage
      this.uniqueDeviceID.get()
        .then((uuid: any) => {
          this.SharedService.Uuid = uuid;
          this.storage.set('deviceId', uuid).then((res) => {
            console.log('Device id save in localstorage');
          })
        })
        .catch((error: any) => console.log(error));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      this.storage.get('user').then(res => {
        this.storage.remove('user');
        if (res != null) {
          this.rootPage = ''
        } else {
          this.rootPage = 'HomePage';
        }
      })
    });
    platform.registerBackButtonAction((e) => {
      e.preventDefault();
    })
  }
}

