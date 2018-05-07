import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {  
  token: any;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public shared:SharedService ,public navParams: NavParams) {
    // this.token = this.shared.token 
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  login(){
    this.navCtrl.push('LoginPage');
  }
  GoTo_Register(){
    this.navCtrl.push('SignupPage');
  }
  
 
}
