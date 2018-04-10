import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SharedService } from '../../provider/shared-service';
/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  rewards: any;
  constructor(public navCtrl: NavController,public shared:SharedService,public app:App,public storage: Storage,public actionSheetCtrl:ActionSheetController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');
    this.getReward()
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

  getReward(){
    this.shared.GameReward().subscribe(res=>{
      if(res['rewards'].length != 0){
        this.rewards = res['rewards'];            
      }
    })
  } 
  doRefresh(event){
      this.getReward();
      event.complete();
  }
}
