import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'pagina-recuperar',
  templateUrl: 'recuperar.html'
})
export class Recuperar {
  recuperaSucesso = false;
  email = {email: ''};

  constructor(private nav: NavController, private alertCtrl: AlertController) {}

  public recuperar() {}

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
