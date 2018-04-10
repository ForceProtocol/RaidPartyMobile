import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, App } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
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

  Games: any;
  Isplatform: string;
  constructor(public navCtrl: NavController, public app: App, public storage: Storage, public actionSheetCtrl: ActionSheetController, platform: Platform, public shared: SharedService, public navParams: NavParams) {
    if (platform.is('android')) {
      this.Isplatform = 'Android'
    } else if (platform.is('ios')) {
      this.Isplatform = 'Ios'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
    this.Get_Games();
  }
  Get_Games() {
    this.shared.GameList(this.Isplatform).subscribe(res => {
      console.log(res['games'])
      if (res['games'].length != 0) {
        this.Games = res['games'];
      }
    })
  }
  play(url) {
    console.log(url);  
    window.open(url)
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

}
