import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {
  cadastroSucesso = false;
  dados = {nome: '', sobrenome: '', email: '', senha: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  public cadastrar() {
    this.auth.cadastrar(this.dados).subscribe(sucesso => {
      if (sucesso) {
        this.cadastroSucesso = true;
          this.alerta("Sucesso", "Cadastrado com sucesso");
      } else {
        this.alerta("Erro", "Erro ao cadastrar");
      }
    },
    error => {
      this.alerta("Error", error);
    });
  }

  alerta(titulo, mensagem) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.cadastroSucesso) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
