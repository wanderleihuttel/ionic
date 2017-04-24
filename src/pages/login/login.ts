import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Loading } from 'ionic-angular';
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
  er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

  constructor(private nav: NavController, private login: LoginService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  public cadastro() {
    this.nav.push(Cadastro);
  }

  public recuperar() {
    this.nav.push(RecuperarSenha);
  }

  public logar() {
    if (!this.er.exec(this.dados.email)) {
      this.alerta("E-mail inválido");
    } else {
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
          this.alerta("E-mail ou senha inválido");
        }
      }, error => {
        this.alerta(error);
      });
    }
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  carregando() {
    this.loading = this.loadingCtrl.create({content: 'Aguarde...'});
    this.loading.present();
  }

  alerta(mensagem) {
    setTimeout(() => {this.loading.dismiss();});

    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
