import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { Login } from '../login/login';
import { Privacidade } from '../privacidade/privacidade';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class Popover {
  constructor(public nav: NavController, public viewCtrl: ViewController) {}

  public privacidade() {
    this.viewCtrl.dismiss();
    this.nav.push(Privacidade)
  }

  public sair() {
    this.viewCtrl.dismiss();
    this.nav.setRoot(Login)
  }
}