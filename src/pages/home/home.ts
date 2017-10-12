import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login/login';

import { AppConfig, AppMsgConfig } from '../../providers/AppConfig';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  userReady: boolean = false;

  constructor(public navCtrl: NavController,
    public fb: Facebook,
    public appConfig: AppConfig,
    public appMsgConfig: AppMsgConfig,
    public nativeStorage: NativeStorage) {

  }

  ionViewCanEnter() {
    this.nativeStorage.getItem('user').then(
      data => {
        this.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture,
          email: data.email,
        };
        this.userReady = true;
      }, (error) => {
        console.log(error);
      }
    );
  }

  doFbLogout() {
    var nav = this.navCtrl;
    this.fb.logout()
      .then((response) => {
        //user logged out so we will remove him from the NativeStorage
        this.appConfig.removeStorage('user');
        nav.push(LoginPage);
      }, (error) => {
        console.log(error);
      });
  }

}
