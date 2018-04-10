import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [SharedService]
})
export class SignupPage {

  Isplatform: any = '';
  deviceId: any = '';
  SignupForm: any;
  constructor(public navCtrl: NavController, platform: Platform, public storage: Storage, public navParams: NavParams, public shared: SharedService, public formBuilder: FormBuilder) {
    this.SignupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,10})$/)])],
      pwd: ['', Validators.compose([Validators.required])],
      cp: ['', Validators.compose([Validators.required])],
    });
    if (platform.is('android')) {
      this.Isplatform = 'Android'
    } else if (platform.is('ios')) {
      this.Isplatform = 'Ios'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  login() {
    this.navCtrl.push('LoginPage');
  }
  Register() {
    this.SignupForm.submitted = true;

    if (this.SignupForm.value.pwd != this.SignupForm.value.cp) {
      this.shared.showToast('password and Confirm password not match');
      return false;
    }
    if (this.SignupForm.valid) {
      this.storage.get('deviceId').then(res => {
        if (res != null) {
          this.deviceId = res
        }
        // var param = { 'email': this.SignupForm.value.email, 'password': this.SignupForm.value.pwd, 'device_id': this.deviceId, 'device_type': this.Isplatform };
        var param = { 'email': this.SignupForm.value.email, 'password': this.SignupForm.value.pwd,'device_type': this.Isplatform };
        this.shared.startLoading();

        this.shared.user_signUp(param).subscribe(res => {
          if (res['success'] == true) {
            this.storage.set('pwd', this.SignupForm.value.pwd);
            this.navCtrl.push('OtpPage', param);
            this.storage.set('SignupData', param)
          }
          else {
            console.log(res)
          }
        }, err => {
          console.log(err)
          this.shared.showToast(err.error.err);
        })
        this.shared.hideLoading();
      })

    }
  }

}
