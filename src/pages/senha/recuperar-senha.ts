import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login';

@Component({
  selector: 'pagina-recuperar-senha',
  templateUrl: 'recuperar-senha.html'
})
export class RecuperarSenha {
  dados = {email: ''};

  constructor(public nav: NavController, public loginProvider: LoginProvider, public alertCtrl: AlertController) {}

  // Recuperar senha
  public recuperar_senha() {}

}
