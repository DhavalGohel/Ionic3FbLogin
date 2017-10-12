import { Component ,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppConfig, AppMsgConfig } from '../providers/AppConfig';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public appConfig: AppConfig,
    public appMsgConfig: AppMsgConfig) {
    platform.ready().then(() => {
      let env = this;
      this.appConfig.getDataFromStorage('user')
        .then(function(data) {

          env.nav.push(HomePage);
          splashScreen.hide();
        }, function(error) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(LoginPage);
          splashScreen.hide();
        });
      statusBar.styleDefault();
    });
  }
}
