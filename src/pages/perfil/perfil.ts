import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AtualizarSenha } from '../atualizar-senha/atualizar-senha';

@Component({
  selector: 'pagina-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {

  constructor(private nav: NavController) {}

  public atualizar_dados(){}

  public atualizar_senha() {
    this.nav.push(AtualizarSenha);
  }
}
