import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
      if (localStorage.getItem('usuario')) {
        this.nav.setRoot(Home);
      } else {
        this.nav.setRoot(Login);
      }
    });
  }
}
