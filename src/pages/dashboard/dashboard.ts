import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
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
  constructor(public navCtrl: NavController, public shared: SharedService, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.shared.getHeaders().then(res => {
      this.shared.startLoading();
      this.shared.user_dashboard().subscribe(res => {
        console.log(res,'dashboard data');
        if(res['success']== true){          
            this.ForceTotal = res['totalForce'];
            this.totalForceUSD = res['totalForceUSD'];
            this.Address = res['wallets'][0].address;
        }
        console.log(this.ForceTotal , this.totalForceUSD , this.Address)
      })
      this.shared.hideLoading();
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
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}

