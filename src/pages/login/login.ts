import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';

import { AppConfig, AppMsgConfig } from '../../providers/AppConfig';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = this.appConfig.mFbAppId;

  constructor(
    public navCtrl: NavController,
    public fb: Facebook,
    public appConfig: AppConfig,
    public appMsgConfig: AppMsgConfig
  ) {
    this.fb.browserInit(this.FB_APP_ID, "v2.10");
  }

  doFbLogin() {
    if (this.appConfig.hasConnection()) {
      let permissions = new Array<string>();
      let nav = this.navCtrl;

      //the permissions your facebook app needs from the user
      permissions = ['public_profile', 'user_friends', 'email'];

      this.fb.login(permissions)
        .then((response) => {
          let userId = response.authResponse.userID;
          let params = new Array<string>();

          //Getting name and gender properties
          this.fb.api("/me?fields=name,gender,email", params)
            .then((user) => {
              console.log(user);
              user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              //now we have the users info, let's save it in the NativeStorage
              let data = {
                name: user.name,
                gender: user.gender,
                picture: user.picture,
                email: user.email
              };
              this.appConfig.setDataToStorage('user', data).then((res) => {
                nav.push(HomePage);
              }, (error) => {
                this.appConfig.showAlertMsg("", this.appMsgConfig.NetworkErrorMsg);
              });
            })
        }, (error) => {
          console.log(error);
        });
      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    } else {
      this.appConfig.showAlertSetting("", this.appMsgConfig.InternetConnection);
    }
  }
}
