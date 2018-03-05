import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  SignupForm: any;
  constructor(public navCtrl: NavController,public storage: Storage,public navParams: NavParams, public shared: SharedService, public formBuilder: FormBuilder) {
    this.SignupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,10})$/)])],
      pwd: ['', Validators.compose([Validators.required])],
      cp: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  } 
  login(){
    this.navCtrl.push('LoginPage');
  } 
  Register() {    
    console.log(this.SignupForm);
    this.SignupForm.submitted = true;
    if(this.SignupForm.value.pwd != this.SignupForm.value.cp){
      console.log('not match');
      this.shared.showToast('password and Confirm password not match');
      return false;
    }
    if (this.SignupForm.valid) {
      var param = {'email':this.SignupForm.value.email,'password':this.SignupForm.value.pwd,"requestMethod": 11};
      this.shared.startLoading();
      this.shared.user_signUp(param).subscribe(res => {
        console.log(res);
        if(res['success']== true){             
          this.storage.set('pwd',this.SignupForm.value.pwd);               
          this.navCtrl.push('OtpPage',param);
        }
        this.shared.hideLoading();
      })
    }
  }  

}
