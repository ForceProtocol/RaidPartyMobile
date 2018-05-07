import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Storage } from '@ionic/storage';
import { SharedService } from '../provider/shared-service';
import { OneSignal } from '@ionic-native/onesignal';
import { Badge } from '@ionic-native/badge';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: 'app.html',
  providers: [SharedService, Badge,]
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any;

  constructor(private globalization: Globalization,
    public platform: Platform,
    public translate:TranslateService,
    statusBar: StatusBar,
    private badge: Badge,
    private oneSignal: OneSignal,
    splashScreen: SplashScreen,
    // private uniqueDeviceID: UniqueDeviceID,
    private storage: Storage,
    public SharedService: SharedService,
    public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // this.translate.setDefaultLang('en')
      this.badge.get().then(res => {
        //e.log(res, 'Current badge')
        this.badge.set(0)
      })
      /** 
       * Get the Current Mobile language
       */
      this.globalization.getPreferredLanguage().then(res => {
        this.storage.set('locale', res.value)
        this.translate.use(res.value)
        this.SharedService.locale = res.value
      })
      /**
       * Get Onesignal UserId and push token
       */
      this.oneSignal.getIds().then(res => {
        //e.log(res)
        this.storage.set('onesignal_ID', res)
      })
      // this.badge.isSupported().then(res=>{
      //   //e.log(res,'badge support');
      //   this.badge.get().then(res=>{
      //     //e.log(res,'no of badges')
      //   })
      //   if(!res){
      //     this.badge.requestPermission().then(res=>{
      //       //e.log(res,'requestPermission');
      //     })
      //   }
      // })
      platform.registerBackButtonAction((e) => {
        e.preventDefault();
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();




      /**
       * Rounting page According to local store data 
       */
      this.storage.get('SignupData').then(res => {
        //e.log(res)
        if (res != null) {
          this.rootPage = 'OtpPage';
        } else {
          this.storage.get('user').then(res => {
            if (res != null) {
              this.rootPage = 'TabsPage';
            } else {
              this.rootPage = 'HomePage';
            }
          })

        }
      })


      this.oneSignal.startInit("28142d5f-8d0d-463e-aa33-26de871f9591", " ");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data => {
        console.log(data,'push handleNotificationReceived');
        
        // if (data.isAppInFocus) {
        //   //e.log('inApp focus');          
        //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        // }       
        this.badge.get().then(res => {
          // //e.log(res, 'no of badges');
          // if(this.nav.getActive().name == '')          
          (res == 0) ? this.badge.increase(1) : this.badge.increase(1);
          if (res == 0) {
            this.SharedService.badgeCounter = 1
          } else {
            this.SharedService.badgeCounter += 1
          }
          // //e.log(curentNav)
          if (this.SharedService.page) {
            this.badge.set(0);
            this.SharedService.badgeCounter = '';
          }
        })
        this.onPushReceived(data.payload,data)
      });
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();

    });

  }
  onPushReceived(data,alldata) {
    console.log(alldata,'onpush received')
    this.SharedService.showToast(data.body)
    //e.log(data, 'onPushReceived')    
  }
  onPushOpened(data) {
    //e.log(data, 'onPushOpened')
    
    this.storage.get('SignupData').then(res => {
      //e.log(res)
      if (res != null) {
        this.rootPage = 'OtpPage';
      } else {
        this.storage.get('user').then(res => {
          if (res != null) {
            // this.rootPage = 'NotificationsPage'; 
            this.badge.clear()  
            if(!this.SharedService.page) 
            this.nav.push('NotificationsPage')
          } else {
            this.rootPage = 'HomePage';
          }
        })
      }
    })
    this.SharedService.showToast(data.body)
  }
  // getid() {
  //   if (this.platform.is('cordova'))
  //     this.uniqueDeviceID.get()
  //       .then((uuid: any) => {
  //         this.SharedService.Uuid = uuid;
  //         this.storage.set('deviceId', uuid).then((res) => {
  //           //e.log('Device id save in localstorage');
  //         })
  //       })
  //       .catch((error: any) => {
  //         //e.log(error);
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

