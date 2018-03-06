import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  forgot_form: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public formbuilder: FormBuilder, public shared: SharedService) {
    this.forgot_form = this.formbuilder.group({
      pwd: ['', Validators.compose([Validators.required])],
      cpd: ['', Validators.compose([Validators.required])]
    })
   console.log(this.navParams.get('pin'));
   this.storage.get('user').then(res=>{
     if(res != null){
       console.log(res,'users in reset page');
     }
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage',this.shared.user.email);
  }
  goto_dashboard() {
    if (this.forgot_form.valid) {
      var param = {
        'email':this.navParams.get('email'),
        'pin':this.navParams.get('pin'),
        'password':this.forgot_form.value.pwd
      }
      this.shared.user_reset_password(param).subscribe(res => {
        console.log(res,'reset password');
        if(res['success'] == true){
            this.shared.showToast(res['msg']);
            this.navCtrl.push('LoginPage');
            // this.storage.set('pwd',this.forgot_form.value.pwd);
            // this.storage.set('user',res)
        }
      }, err => {
       this.shared.showToast(err.error.err);
      })
    }    
  }
  goto_otp_forgot() {
    this.navCtrl.push('OtpForgotPage')
  }
}
