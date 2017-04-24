import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {
  loading: Loading;
  sucesso = false;

  dados = {nome: '', sobrenome: '', email: '', senha: ''};

  constructor(private nav: NavController, private cadastro: LoginService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  cadastrar() {
    this.carregando();
    this.cadastro.cadastrar(this.jsonToURLEncoded({
      nome: this.dados.nome,
      sobrenome: this.dados.sobrenome,
      email: this.dados.email,
      senha: this.dados.senha
	})).subscribe(retorno => {
      if (retorno.resposta == 'cadastrou') {
          setTimeout(() => {
            this.loading.dismiss();
          });
          this.sucesso = true;
          this.alerta("Cadastrado com sucesso");
      } else {
        this.alerta("Erro ao cadastrar");
      }

    }, error => {
      this.alerta(error);
    });
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
    if (this.sucesso) {
      this.nav.popToRoot();
    }
    toast.present();
  }
}
