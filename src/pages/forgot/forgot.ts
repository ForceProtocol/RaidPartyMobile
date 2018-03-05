import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../provider/shared-service';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  forgot_form: any;


  constructor(public navCtrl: NavController, public SharedService: SharedService, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.forgot_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,10})$/)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  goto_forgot_otp() {
    console.log(this.forgot_form.value)
    if (this.forgot_form.valid) {
      this.SharedService.user_forgot_pwd({'email':this.forgot_form.value.email,'requestMethod':11}).subscribe(res => {
        console.log(res,'forgot password Api response');
        if(res['msg']){
          this.navCtrl.push('OtpForgotPage',{'email':this.forgot_form.value.email});          
        }
      }, (err) => {
        console.log(err);
        this.SharedService.showToast(err['err']);
      })
    }
    // this.navCtrl.push('OtpForgotPage')
  }
  goto_login() {
    this.navCtrl.push('LoginPage')
  }
}	
