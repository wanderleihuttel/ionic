import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'pagina-recuperar',
  templateUrl: 'recuperar.html'
})
export class Recuperar {
  recuperaSucesso = false;
  dados = {email: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  public recuperar() {
    this.auth.recuperar(this.dados).subscribe(sucesso => {
      if (sucesso) {
        this.recuperaSucesso = true;
          this.alerta("Sucesso", "Enviamos um e-mail com link de recuperação");
      } else {
        this.alerta("Erro", "Erro ao enviar e-mail");
      }
    },
    error => {
      this.alerta("Error", error);
    });
  }

  public login() {
    this.nav.popToRoot();
  }

  alerta(titulo, mensagem) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.recuperaSucesso) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
