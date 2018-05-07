import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, App, ModalController } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Badge } from '@ionic-native/badge';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

  tabBarElement: any;
  GameCode: any;
  Games: any;
  Isplatform: string;
  constructor(private badge: Badge, public navCtrl: NavController, private modalCtrl: ModalController, private clipboard: Clipboard, public app: App, public storage: Storage, public actionSheetCtrl: ActionSheetController, platform: Platform, public shared: SharedService, public navParams: NavParams) {
    if (platform.is('android')) {
      this.Isplatform = 'Android'
    } else if (platform.is('ios')) {
      this.Isplatform = 'Ios'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
    this.badge.get().then(res => {
      if (res == 0) {
        this.shared.badgeCounter = ''
      } else
        this.shared.badgeCounter = res
    })
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = '-webkit-box';
    }
    this.Get_Games();
    this.shared.getcode().subscribe(res => {
      console.log(res);
      this.GameCode = res['code']
    }, err => {
      console.log(err)
      this.shared.showToast(err)
    })
  }
  Code_copy() {
    console.log('copy call')
    if (this.GameCode != undefined) {
      this.clipboard.copy(this.GameCode);
      this.shared.translatelang('Code copy to clipboard').then(res=>{
        console.log(res)
        this.shared.showToast(res)
      })
      
    }

  }
  Get_Games() {
    this.shared.startLoading()
    this.shared.GameList('Android').subscribe(res => {
      console.log(res['games'])
      this.shared.hideLoading()
      if (res['games'].length != 0) {
        this.Games = res['games'];
      }
    })
  }
  play(url) {
    console.log(url);
    window.open(url,'_self')
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Change Password',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('ChangePasswordPage');
          }
        },
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            console.log("Logout");
            this.storage.clear();
            // this.navCtrl.setRoot('LoginPage')
            this.app.getRootNav().setRoot('LoginPage');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  doRefresh(refresher: any) {
    this.Get_Games();
    refresher.complete();
  }
  openModal(data) {
    console.log(data, 'openmodel')
    let modal = this.modalCtrl.create('ModalPage', { 'data': data }, {
      showBackdrop: true,
      enableBackdropDismiss: true
    });
    modal.present();
  }
  GoTo_notifications() {
    this.navCtrl.push('NotificationsPage')
  }
}
