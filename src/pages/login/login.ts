import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { Cadastro } from '../cadastro/cadastro';
import { RecuperarSenha } from '../recuperar-senha/recuperar-senha';
import { Home } from '../home/home';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-login',
  templateUrl: 'login.html'
})
export class Login {
  loading: Loading;
  dados = {email: '', senha: ''};

  constructor(private nav: NavController, private login: LoginService, private alert: AlertController, private loadingCtrl: LoadingController) {}

  public cadastro() {
    this.nav.push(Cadastro);
  }

  public recuperar() {
    this.nav.push(RecuperarSenha);
  }

  public logar() {
    this.carregando();
    this.login.logar(this.jsonToURLEncoded({
      email: this.dados.email,
      senha: this.dados.senha
	})).subscribe(retorno => {
      if (retorno.resposta == 'logou') {
        setTimeout(() => {
          this.loading.dismiss();
        });

        // Gravar dados no SQLite

        this.nav.setRoot(Home);
      } else {
        this.alerta("Erro", "E-mail ou senha inválido");
      }
    }, error => {
      this.alerta("Error", error);
    });
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  carregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }

  alerta(titulo, mensagem) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alert.create({
      title: titulo,
      subTitle: mensagem,
      buttons: [{
        text: 'OK'
      }]
    });
    alert.present();
  }

  /*erro(mensagem) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present(prompt);
  }*/
}
