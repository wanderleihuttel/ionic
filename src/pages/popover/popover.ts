import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { Login } from '../login/login';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class Popover {
  constructor(public nav: NavController, public viewCtrl: ViewController) {}

  public sair() {
    this.viewCtrl.dismiss();
    localStorage.clear();
    this.nav.setRoot(Login);
  }
}