import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  nome = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUsuarioDados();
    this.nome = info.nome;
    this.email = info.email;
  }

  public sair() {
    this.auth.logout().subscribe(succ => {
        this.nav.setRoot(Login)
    });
  }

}
