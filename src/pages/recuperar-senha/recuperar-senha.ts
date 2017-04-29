import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';

@Component({
  selector: 'pagina-recuperar-senha',
  templateUrl: 'recuperar-senha.html'
})
export class RecuperarSenha {
  dados = {email: ''};

  constructor(public nav: NavController, public login: LoginService, public alertCtrl: AlertController) {}

  // Recuperar senha
  public recuperar_senha() {}

}
