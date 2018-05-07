import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';
import { SharedService } from '../../provider/shared-service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  tabBarElement: any;
  notification: any;
  list: any;
  constructor(public navCtrl: NavController, private badge: Badge, private app: App, public storage: Storage, public shared: SharedService, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.list =
      [
        { 'title': 'TEST1', 'detail': '	Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'undo': false, 'time': '2018-03-08T12:52:56.000Z' },
        { 'title': 'TEST2', 'detail': '	Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'undo': false, 'time': '2018-03-08T12:52:56.000Z' },
        { 'title': 'TEST3', 'detail': '	Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'undo': false, 'time': '2018-03-08T12:52:56.000Z' },
        { 'title': 'TEST4', 'detail': '	Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'undo': false, 'time': '2018-03-08T12:52:56.000Z' }
      ]

  }

  /**
   * Hide the Tabs when Page will enter for view 
   */
  ionViewWillEnter() {
    console.log('ionViewDidLoad NotificationsPage');
    this.shared.page = true
    this.tabBarElement = document.querySelector('.tabbar');
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = 'none';
    }
    this.storage.get('locale').then(res => {
      this.shared.locale = res
    })
    this.getNotification()
  }
  /**
   * GET notification list from Api
   */
  getNotification() {
    this.shared.notifications().subscribe(res => {
      this.shared.badgeCounter = '';
      this.badge.clear();
      console.log(res, 'notification')
      if (res['notifications'].length != 0) {
        this.notification = res['notifications']
        this.notification.forEach(element => {
          element.undo = false
        });
      }
    }, err => {
      this.shared.badgeCounter = '';
      this.badge.clear();
    })
  }
  /**
   * 
   * @param time - Convert the Time stamp to HH:MM formate
   */
  convertTime(time) {
    return moment(time).format("hh:mm a")
  }

  /**
   * Open the ActionSheet
   */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Change Password',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('ChangePasswordPage');
          }
        },
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            console.log("Logout");
            this.storage.clear();
            this.app.getRootNav().setRoot('LoginPage');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * 
   * @param item - no of the notification from the list which is remove 
   */
  RemoveItem(item) {
    console.log(item)
    this.notification[item].undo = true
    setTimeout(() => {
      this.removeFromList()
    }, 2000);
  }

  /**
   * Delete Notification from server
   */
  removeFromList() {
    for (let one of this.notification)
      if (one.undo) {
        this.notification.splice(this.list.indexOf(one), 1)
        this.shared.deleteNotification({ 'notification_id': one.id }).subscribe(res => {
          console.log(res)
        })
      }
  }

  /**
   * 
   * @param refresher :refresher event 
   * Refresh page
   */

  doRefresh(refresher: any) {
    this.getNotification();
    refresher.complete();
  }

  /**
   * 
   * @param i - change undo flag to true
   */
  undo(i) {
    this.notification[i].undo = false
  }
  /**
   * 
   * @param id - Notifcation Id which is used for delete notification
   */
  deleteNotification(id) {
    this.shared.deleteNotification({ 'notification_id': id, 'locale': this.shared.locale }).subscribe(res => {
      console.log(res)
    })
  }

  /**
   * when leave page Tabs display in view
   */
  ionViewWillLeave() {
    this.shared.page = false;
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = '-webkit-box';
    }
  }
}
