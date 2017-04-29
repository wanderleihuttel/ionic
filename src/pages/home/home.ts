import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';

//import { Pedidos } from '../pedidos/pedidos';
//import { Perfil } from '../perfil/perfil';

import { Popover } from '../popover/popover';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  public showSearchBar: boolean = false;    
  usuario: {};

  constructor(public nav: NavController, public popoverCtrl: PopoverController, public login: LoginService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  public toogleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  public closeSearchBar() {
    if (this.showSearchBar == true) {
      this.showSearchBar = false;
    }
  }

  public popover(event) {
    this.closeSearchBar();
    let popover = this.popoverCtrl.create(Popover);
    popover.present({
      ev: event
    });
  }

  public onInput() {}

  public onCancel() {
    this.showSearchBar = !this.showSearchBar;
  }
}
