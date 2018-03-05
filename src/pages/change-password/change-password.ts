import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../provider/shared-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  change_password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public formbuilder: FormBuilder, public SharedService: SharedService) {
    this.change_password = this.formbuilder.group({
      current_pwd: ['', Validators.compose([Validators.required])],
      new_password: ['', Validators.compose([Validators.required])],
      confirm_pwd: ['', Validators.compose([Validators.required])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  change_pwd() {
    console.log(this.change_password.value);
    if (this.change_password.value.new_password != this.change_password.value.confirm_pwd) {
      console.log('not match');
      this.SharedService.showToast('password and Confirm password not match');
      return false;
    }
    this.storage.get('pwd').then(res => {
      if (res != null) {
        // check old password with current password
        if (this.change_password.value.current_pwd != res) {
          this.SharedService.showToast('Current password does not match');
          return false;
        } else {
          // if All data Valid then Api call
          if (this.change_password.valid) {
            var param = {
              'password': this.change_password.value.current_pwd,
              'newPassword': this.change_password.value.new_password
            }
            this.SharedService.user_changePassword(param).subscribe(res => {
              console.log(res, 'change password');
              if (res['success'] == true) {
                this.SharedService.showToast('Password change successfuly');
                this.storage.set('pwd', this.change_password.value.new_password);
              } else {
                this.SharedService.showToast('Invalid');
              }
            }, err => {
              this.SharedService.showToast(err.error.err);
            })
          }
        }
      }
    })

  }
  goto_dashboard() {
    this.navCtrl.push('DashboardPage')
  }
}
