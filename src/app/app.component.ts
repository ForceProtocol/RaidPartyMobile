import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Storage } from '@ionic/storage';
import { SharedService } from '../provider/shared-service';


declare var cordova: any;
@Component({
  templateUrl: 'app.html',
  providers: [SharedService]
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    // private uniqueDeviceID: UniqueDeviceID,
    private storage: Storage,
    public SharedService: SharedService,
    public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // For Get Unique device id and save in localstorage
      // this.getid();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      this.storage.get('SignupData').then(res => {
        console.log(res)
        if (res != null) {
          this.rootPage = 'OtpPage';
        } else {
          this.rootPage = 'HomePage';
        }
      })
    });
    // platform.registerBackButtonAction((e) => {
    //   e.preventDefault();
    // })
  }

  // getid() {
  //   if (this.platform.is('cordova'))
  //     this.uniqueDeviceID.get()
  //       .then((uuid: any) => {
  //         this.SharedService.Uuid = uuid;
  //         this.storage.set('deviceId', uuid).then((res) => {
  //           console.log('Device id save in localstorage');
  //         })
  //       })
  //       .catch((error: any) => {
  //         console.log(error);
  //         // this.SharedService.showToast('');
  //         let toast = this.toastCtrl.create({
  //           message: 'To earn your force reward you must grant the relevant permission',
  //           duration: 5000,
  //           position: 'top'
  //         })
  //         toast.present(toast)
  //         setTimeout(() => {
  //           this.getid();
  //         }, 5000)
  //       });
  // }

}

