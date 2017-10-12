# Ionic3FbLogin
Facebook login integration

Step 1:-) Create Ionic Blank App

```ionic start -g ionic3fblogin --blank```

Step 2:-)  Create app from facebook Folloing below link

```https://developers.facebook.com/apps/```

Step 3:-) Follow Ionic Documentation for required package to install Fb login

```https://ionicframework.com/docs/native/facebook/ ```

Step 4:-) Install Package

    Install the Cordova and Ionic Native plugins:

    ```$ ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"
    $ npm install --save @ionic-native/facebook```

    Add this plugin to your app's module

Step 5:-) Below Code for Login

```
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
}```
