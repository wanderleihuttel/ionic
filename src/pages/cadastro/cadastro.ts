import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Termos } from '../termos/termos';
import { Privacidade } from '../privacidade/privacidade';

import { LoginService } from '../../providers/login-service';
import { Toast } from '../../providers/toast';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {
  dados = {nome: '', sobrenome: '', email: '', telefone: '', senha: ''};

  constructor(public nav: NavController, public cadastro: LoginService, public loadingCtrl: LoadingController, public toast: Toast) {}

  termos() {
    this.nav.push(Termos);
  }

  privacidade() {
    this.nav.push(Privacidade);
  }

  // Cadastrar usuário
  cadastrar() {
    const loading = this.loadingCtrl.create({content: 'Aguarde...'}); 
    loading.present().then(() => {
      this.cadastro.cadastrar(this.jsonToURLEncoded({
        nome: this.dados.nome,
        sobrenome: this.dados.sobrenome,
        email: this.dados.email,
        telefone: this.dados.telefone,
        senha: this.dados.senha
	  })).subscribe(retorno => {
        if (retorno.resposta == 'cadastrou') {
            this.nav.popToRoot();
            this.toast.alerta("Cadastrado com sucesso");
        } else {
            this.toast.alerta("Erro ao cadastrar");
        }
        loading.dismiss();
      }, error => {
        loading.dismiss();
        this.toast.alerta(error);
      });
    });
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
