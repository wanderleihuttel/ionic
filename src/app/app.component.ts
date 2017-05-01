import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform, public splashScreen: SplashScreen) {
    if (localStorage.getItem('usuario')) {
      this.rootPage = Home;
    } else {
      this.rootPage = Login;
    }
    this.platformReady();
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
