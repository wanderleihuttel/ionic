import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html',
  providers:[ AuthService ]
})
export class Cadastro {
  dados: any;
  sucesso = false;

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController) {
    this.dados = {};
  }

  cadastrar() {
    this.auth.cadastrar(JSON.stringify({
      nome: this.dados.nome,
      sobrenome: this.dados.sobrenome,
      email: this.dados.email,
      senha: this.dados.senha
	}).subscribe(resposta => {
      if (resposta == 'cadastrou') {
          this.sucesso = true;
          this.alerta("Sucesso", "Cadastrado com sucesso");
      } else {
        this.alerta("Erro", "Erro ao cadastrar");
      }
    },
    error => {
      this.alerta("Error", error);
    });
    );
  }

  ionViewDidLoad() {}

/*  cadastroSucesso = false;
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
  }*/

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
