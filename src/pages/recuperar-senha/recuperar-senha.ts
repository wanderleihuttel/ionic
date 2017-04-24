import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';

@Component({
  selector: 'pagina-recuperar-senha',
  templateUrl: 'recuperar-senha.html'
})
export class RecuperarSenha {
  sucesso = false;
  dados = {email: ''};

  constructor(private nav: NavController, private login: LoginService, private alertCtrl: AlertController) {}

  public recuperar() {}

  alerta(titulo, mensagem) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.sucesso) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
