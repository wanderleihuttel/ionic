import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { Login } from '../login/login';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';
import { Privacidade } from '../privacidade/privacidade';

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

  constructor(private nav: NavController, private menuCtrl: MenuController, private login: LoginService) {
    this.menuCtrl.enable(true, 'menu');
    /*let info = this.auth.getUsuarioDados();
    this.codigo = info.codigo;
    this.nome = info.nome;
    this.email = info.email;*/
  }

  public toggleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  public menuCloseSearchBar() {
    if (this.showSearchBar) {
      this.showSearchBar = false;
    }
  }

  public onInput() {}

  public onCancel() {
    this.showSearchBar = !this.showSearchBar;
  }

  public pedidos() {
    this.nav.push(Pedidos)
  }

  public perfil() {
    this.nav.push(Perfil)
  }

  public privacidade() {
    this.nav.push(Privacidade)
  }

  public sair() {
    this.nav.setRoot(Login)
  }

}
