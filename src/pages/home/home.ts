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
  pesquisa = '';
  codigo = '';
  nome = '';
  email = '';

  constructor(public nav: NavController, public popoverCtrl: PopoverController, public login: LoginService) {
    /*let info = this.auth.getUsuarioDados();
    this.codigo = info.codigo;
    this.nome = info.nome;
    this.email = info.email;*/
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
