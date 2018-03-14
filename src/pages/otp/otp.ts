import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  otpForm: any;
  tmpCode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public formBuilder: FormBuilder, public shared: SharedService) {
    this.otpForm = formBuilder.group({
      otp: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9]{1,3}/)])]
    });

    console.log(this.navParams.get('email'));
    this.storage.get('pwd').then(res => {
      if (res != null) {
        this.tmpCode = res
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }
  goto_create() {
    this.navCtrl.push('SignupPage')
  }
  goto_dashboard() {
    this.otpForm.submitted = true
    if (this.otpForm.valid) {
      this.shared.startLoading();
      var param = { 'pin': this.otpForm.value.otp, 'email': this.navParams.get('email') }
      this.shared.user_Otp(param).subscribe(res => {
        if (res['success'] == true) {
          // {'email':this.navParams.get('email'),'password':this.navParams.get('password')}
          this.shared.user = res['player'];
          this.storage.set('pwd', this.navParams.get('password'));
          this.storage.set('user', res).then(res => {
            console.log(res, 'user save in local')
          })
          this.navCtrl.push('DashboardPage');          
        } else {
          this.shared.showToast('Please enter valid otp');
        }
      }, err => {
        console.log(err);
        this.shared.showToast(err.error.err);
      })
      this.shared.hideLoading();
    }
  }

  resendOTP() {
    console.log('resend call');
    this.shared.showToast('under the Development');
    // this.shared.resend().subscribe(res=>{
    //   console.log(res);
    // })
  }
}
