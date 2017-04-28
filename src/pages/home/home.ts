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

  constructor(public nav: NavController, public popoverCtrl: PopoverController, public login: LoginService, public params: NavParams) {
    this.usuario = this.params.get('usuario');
    console.log(usuario);
  }

  public searchBar() {
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

  /*public pedidos() {
    this.nav.push(Pedidos)
  }

  public perfil() {
    this.nav.push(Perfil)
  }*/
}
