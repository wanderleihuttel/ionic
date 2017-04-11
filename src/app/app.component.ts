import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
      this.nav.setRoot(IntroPage);
    });
  }
}
