import { Injectable } from '@angular/core';
import { App, Platform, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AppConfig {
  // App Url's
  public mFbAppId = 125533456;  // Replace with App id created in facebook
  public mFbAppName = "MYAPPNAME"; // replace with app name created in facebook

  public emailPattern = /^[_A-Za-z0-9/.]+([_A-Za-z0-9-/+/-/?/*/=///^/!/#/$/%/'/`/{/}/|/~/;]+)*@[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*(\.[A-Za-z]{2,})$/;
  public numberPattern: any = /^[0-9]+$/;
  public urlPattern: any = /^(ftp|http|https):\/\/[^ "]+$/;
  public pincodePattern: any = /^[1-9][0-9]{5}$/;
  public panCardPattern: any = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

  // App Components
  public mLoader: any;
  public mToast: any;

  constructor(
    public appCtrl: App,
    public device: Device,
    public platform: Platform,
    public network: Network,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public appVersion: AppVersion,
    public openNativeSettings: OpenNativeSettings,
    public nativeStorage: NativeStorage) {
  }

  isRunOnMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  isRunOnAndroidDevice() {
    return this.platform.is('android') ? true : false;
  }

  isRunOnIos() {
    return this.platform.is('ios') ? true : false;
  }

  exitApp() {
    if (this.isRunOnMobileDevice()) {
      this.platform.exitApp();
    }
  }

  backFromTabPage() {
    if (this.appCtrl != null && this.appCtrl.getRootNav()) {
      this.appCtrl.getRootNav().pop();
    }
  }

  getDeviceUUID() {
    if (this.isRunOnMobileDevice()) {
      return this.device.uuid;
    }

    return "";
  }

  getAppVersion() {
    return new Promise((resolve, reject) => {
      if (this.isRunOnMobileDevice()) {
        this.appVersion.getVersionNumber().then(version => {
          resolve(version);
        });
      } else {
        resolve(null);
      }
    });
  }

  openNativeSetting(settingName) {
    if (this.isRunOnMobileDevice()) {
      this.openNativeSettings.open(settingName);
    }
  }

  showLoading(message) {
    this.mLoader = this.loadingCtrl.create({
      duration: 30000,
      content: message
      // spinner: 'hide',
      // showBackdrop: true,
      // enableBackdropDismiss: true,
      // dismissOnPageChange: true
    });

    if (this.mLoader != null) {
      this.mLoader.onDidDismiss(() => {
        // console.log('Dismissed loading');
      });

      this.mLoader.present();
    }
  }

  hideLoading() {
    if (this.mLoader != null) {
      this.mLoader.dismiss();
    }
  }

  // Local Toast
  showToast(msg, position, duration, isShowCloseBtn, closeButtonText, hideOnPageChange) {
    if (isShowCloseBtn) {
      this.mToast = this.toastCtrl.create({
        message: msg,
        position: position,
        duration: duration,
        showCloseButton: isShowCloseBtn,
        closeButtonText: closeButtonText,
        dismissOnPageChange: hideOnPageChange
      });
    } else {
      this.mToast = this.toastCtrl.create({
        message: msg,
        position: position,
        duration: duration,
        dismissOnPageChange: hideOnPageChange
      });
    }

    this.mToast.present();
  }

  hideToast() {
    if (this.mToast != null) {
      this.mToast.dismiss();
    }
  }

  showNativeToast(msg, position, duration) {
    if (this.isRunOnMobileDevice()) {
      this.mToast.show(msg, duration, position).subscribe(
        toast => {
          // console.log(toast);
        });
    } else {
      this.showToast(msg, position, duration, true, "ok", true);
    }
  }

  hideNativeToast() {
    // To-do
  }

  showAlertMsg(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });

    alert.present();
  }

  showAlertSetting(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Go To Setting',
          handler: () => {
            this.openNativeSetting("network");
          }
        },
      ]
    });

    alert.present();
  }

  hasConnection() {
    if (this.isRunOnMobileDevice()) {
      // console.log(this.network.type);

      if (this.network.type == "unknown" || this.network.type == null || this.network.type == "none") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  setDataToStorage(key, data) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.setItem(key, data)
        .then(() => {
          resolve(true);
        }, (error) => {
          reject(error);
        })
    });
  }

  getDataFromStorage(key){
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem(key)
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        })
    });
  }

  removeStorage(key){
    this.nativeStorage.remove('user');
  }
}

export class AppMsgConfig {
  // String Messages
  public Loading = "Loading...";
  public Error = "Error";
  public NetworkErrorMsg = "Network Error.";
  public InternetConnection = "Internet Connection";
  public NoInternetMsg = "No internet connection available.";
  public NoTextMsg = "No data available.";
  public NoMoreDataMsg = "No more data available.";
  public DataSubmitConfirm = "Are you sure you want to submit this data?";

  public Yes = "Yes";
  public No = "No"


  // Login page
  public LoginSuccessMsg = "Login successfully.";
  public LogoutSuccessMsg = "Logout successfully.";

  constructor() {

  }
}
