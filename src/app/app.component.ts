import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { Intro } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
      this.nav.setRoot(Intro);
    });
  }
}
