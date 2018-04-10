import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [SharedService]
})
export class LoginPage {
  loginForm: any;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public SharedService: SharedService, public formBuilder: FormBuilder) {    
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,10})$/)])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  register() {
    this.navCtrl.push('SignupPage');
  }
  login() {
    if (this.loginForm.valid) {
      this.SharedService.startLoading();
      this.SharedService.user_login(this.loginForm.value).subscribe((res) => {
        console.log(res['success'],res);
        if (res['success'] == true) {
          this.SharedService.user = res['user'];
          this.storage.set('pwd',this.loginForm.value.password);          
          this.storage.set('user', res).then(res => {
            console.log(res, 'user save in local')
          })          
          this.navCtrl.push('TabsPage');          
        } else {
          this.SharedService.showToast('Invalid Email or password to provided');
        }
      }, (err) => {        
        this.SharedService.showToast(err.error.err);
      })
      this.SharedService.hideLoading();
    }
  }
  Forgot_pwd() {
    this.navCtrl.push('ForgotPage');
  }

}
