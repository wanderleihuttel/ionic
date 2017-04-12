import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Cadastro } from '../cadastro/cadastro';
import { Home } from '../home/home';

@Component({
  selector: 'pagina-login',
  templateUrl: 'login.html'
})
export class Login {
  loading: Loading;
  dados = {email: '', senha: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public cadastro() {
    this.nav.push(Cadastro);
  }

  public logar() {
    this.carregando()
    this.auth.logar(this.dados).subscribe(sucesso => {
      if (sucesso) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(Home)
        });
      } else {
        this.erro("Acesso negado");
      }
    },
    error => {
      this.erro(error);
    });
  }

  carregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }

  erro(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
