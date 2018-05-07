import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  games: any;
  checkboxClass: string;
  className:String
  constructor(public viewctrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {    
    this.games = this.navParams.data['data']
    console.log(this.games)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.className = 'prize-list'
  }
  test($event){
    console.log('change',$event.value)
    if($event.value){
      this.className = 'prize-list active'
      this.checkboxClass = 'item-checkbox-checked'
    }else{
      this.className = 'prize-list'
    }
  }
  close(){
    this.viewctrl.dismiss()
  }
  play(url) {
    console.log(url);  
    window.open(url,'_self')
  }
}
