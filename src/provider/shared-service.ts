import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';



@Injectable()
export class SharedService {
    loading: any;
    isOnline: boolean;
    reqOptions: any;
    Uuid: any;
    baseUrl: string;
    user: any;
    constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public storage: Storage) {
        this.baseUrl = 'http://staging.hub.raidparty.io/mob/player/';
        // this.baseUrl = 'https://hub.raidparty.io/mob/player/';
        this.getHeaders();
    }


    startLoading() {
        this.loading = this.loadingCtrl.create({
            spinner: 'dots'
        });
        this.loading.present();
    }

    /** hide Loading */
    hideLoading() {
        this.loading.present().then(() => {
            this.loading.dismiss();
        })
    }
    // Toast message display
    showToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present(toast);
    }
    // set request header
    getHeaders() {
        return new Promise((resolve, reject) => {

            this.storage.get('user').then(user => {
                // console.log(user.token)
                if (user != null) {
                    this.reqOptions = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer ' + user.token } }
                }
                else {
                    this.storage.get('deviceId').then(res => {
                        // console.log(res);
                        if (res != null) {
                            this.reqOptions = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'mobileDeviceId': res } }
                        } else {
                            this.reqOptions = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
                        }
                    })

                }
                console.log(this.reqOptions)
                resolve(this.reqOptions);
            });
        });
    }
    // Convert Object to parameter to send in http request
    formData(myFormData) {
        return Object.keys(myFormData).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(myFormData[key]);
        }).join('&');
    }
    // Login 
    user_login(data) {
        return this.http.post(`${this.baseUrl}login`, this.formData(data), this.reqOptions);
    }

    // Signup Api call
    user_signUp(data) {
        this.getHeaders();
        return this.http.post(`${this.baseUrl}signup`, this.formData(data), this.reqOptions);
    }

    // Forgot password Api
    user_forgot_pwd(data) {
        return this.http.post(`${this.baseUrl}reset-password`, this.formData(data), this.reqOptions);
    }

    // Get user wallets
    user_dashboard() {
        return this.http.get(`${this.baseUrl}dashboard`, this.reqOptions);
    }

    // Reset password Api
    user_reset_password(data) {
        return this.http.post(`${this.baseUrl}change-password`, this.formData(data), this.reqOptions);
    }

    // From Forgot password Otp verify
    user_varifyOtp(data) {
        return this.http.post(`${this.baseUrl}validate-pin`, this.formData(data), this.reqOptions);
    }

    // Signup otp verify
    user_Otp(data) {
        return this.http.post(`${this.baseUrl}activate`, this.formData(data), this.reqOptions);
    }

    resend() {
        // comming soon
    }

    // Change password Api
    user_changePassword(data) {
        return this.http.post(`${this.baseUrl}update-password`, this.formData(data), this.reqOptions);
    }

    GameList(data) {
        return this.http.get(`${this.baseUrl}games?device_type=` + data, this.reqOptions);
    }

    getcode(){
        return this.http.get('https://raidpartymobile.docs.apiary.io/#reference/0/authenticated-routes/get-game-code/mob/player/game/code',this.reqOptions);
    }

    GameReward(){
        return this.http.get(`${this.baseUrl}rewards`, this.reqOptions);
    }
}