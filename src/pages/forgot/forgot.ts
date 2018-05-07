import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
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


  constructor(public navCtrl: NavController,  public storage: Storage,public SharedService: SharedService, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.forgot_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,10})$/)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
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
  goto_forgot_otp() {
    console.log(this.forgot_form.value)
    if (this.forgot_form.valid) {
      this.SharedService.startLoading();
      this.SharedService.user_forgot_pwd({'email':this.forgot_form.value.email,'locale':this.SharedService.locale}).subscribe(res => {
        console.log(res,'forgot password Api response');
        if(res['success'] == true){
          this.navCtrl.push('OtpForgotPage',{'email':this.forgot_form.value.email});          
        }
      }, (err) => {       
        this.SharedService.showToast(err['err']);
      })
      this.SharedService.hideLoading();
    }
    // this.navCtrl.push('OtpForgotPage')
  }
  goto_login() {
    this.navCtrl.push('LoginPage')
  }
}	
