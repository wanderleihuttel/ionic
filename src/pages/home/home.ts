import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { Categorias } from '../categorias/categorias';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  codigo = '';
  nome = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUsuarioDados();
    this.codigo = info.codigo;
    this.nome = info.nome;
    this.email = info.email;
  }

  public categorias() {
      this.nav.push(Categorias)
  }

  public pedidos() {
      this.nav.push(Pedidos)
  }

  public perfil() {
      this.nav.push(Perfil)
  }

  public sair() {
    this.auth.sair().subscribe(sucesso => {
        this.nav.setRoot(Login)
    });
  }

}
