import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OtpForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-forgot',
  templateUrl: 'otp-forgot.html',
})
export class OtpForgotPage {
  tmpCode: any;
  otpForm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage, public shared: SharedService, public formbuilder: FormBuilder) {
    this.otpForm = this.formbuilder.group({
      PIN: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]{1,3}/)])]
    })
    this.storage.get('pwd').then(res => {
      console.log(res);
      if (res != null) {
        this.tmpCode = res
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpForgotPage');
    this.storage.get('locale').then(res=>{
      this.shared.locale = res
    })
  }
  goto_forgot() {
    this.navCtrl.push('ForgotPage')
  }
  goto_reset() {
    if(this.otpForm.valid){
      this.shared.startLoading();
      var param = { 'pin': this.otpForm.value.PIN, 'email': this.navParams.get('email'),'locale':this.shared.locale }
      this.shared.user_varifyOtp(param).subscribe(res=>{
        console.log(res,'forgot password pin ');
        if(res['success'] == true){
          this.navCtrl.push('ResetPage',{'pin':this.otpForm.value.PIN,'email':this.navParams.get('email')})
        }else{
          this.shared.translatelang('Please enter Valid otp').then(res=>{
            this.shared.showToast(res);  
          })
          // this.shared.showToast('Please enter Valid otp')
        }
      },err=>{
        this.shared.showToast(err.error.err);
      })
      this.shared.hideLoading();
    }
    
    
  }
  resendOTP() {
    this.shared.showToast('Under the process');
  }
}
