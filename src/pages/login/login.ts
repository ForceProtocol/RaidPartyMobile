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
      locale: ['']
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('locale').then(res=>{
      console.log(res)
      if(res != null){
      this.SharedService.locale = res
      }else{
        this.SharedService.getUserlang().then(res=>{
          console.log(res,'else in login page');          
          if(res != ''){
            this.storage.set('locale',res)
            this.SharedService.locale = res
          }
        })
      }
    })
  }
  /**
   * Navigate to Register Page
   */
  register() {
    this.navCtrl.push('SignupPage');
  }
  /**
   * Login Api call and save users data in local storage
   */
  login() {
    if (this.loginForm.valid) {
      console.log(this.SharedService.locale);
      
      this.loginForm.controls['locale'].setValue(this.SharedService.locale)
      this.SharedService.startLoading();
      this.SharedService.user_login(this.loginForm.value).subscribe((res) => {
        console.log(res['success'], res);
        if (res['success'] == true) {
          this.SharedService.user = res['user'];
          this.storage.set('pwd', this.loginForm.value.password);
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
  /**
   * Navigate to Forgot password page
   */
  Forgot_pwd() {
    this.navCtrl.push('ForgotPage');
  }

}
