import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Login } from '../pages/login/login';
import { Tabs } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
      if (localStorage.getItem('usuario')) {
        this.nav.setRoot(Tabs);
      } else {
        this.nav.setRoot(Login);
      }
    });
  }
}
