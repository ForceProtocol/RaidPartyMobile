import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, App } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  Address: any;
  totalForceUSD: any;
  ForceTotal: any;
  constructor(public navCtrl: NavController, public app: App, public storage: Storage, public alertCtrl: AlertController, public platform: Platform, public shared: SharedService, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.shared.getHeaders().then(res => {
      this.shared.startLoading();
      this.shared.user_dashboard().subscribe(res => {
        console.log(res, 'dashboard data');
        if (res['success'] == true) {
          this.ForceTotal = res['player'].totalForce;
          this.ForceTotal = this.ForceTotal
          this.totalForceUSD = res['player'].totalForceUSD;
          this.Address = res['player'].playerId;
        }
        console.log(this.ForceTotal, this.totalForceUSD, this.Address)
      })
      this.shared.hideLoading();
    })
    platform.registerBackButtonAction(() => {
      // navigator['app'].exitApp();
      let alert = this.alertCtrl.create({
        title: 'Confirm Exit',
        message: 'Do you want Exit?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Yes clicked');
              this.platform.exitApp();
            }
          }
        ]
      });
      alert.present()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
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
}

