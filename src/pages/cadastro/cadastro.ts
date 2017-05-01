import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Termos } from '../termos/termos';
import { Privacidade } from '../privacidade/privacidade';

import { LoginService } from '../../providers/login-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {
  dados = {nome: '', sobrenome: '', email: '', telefone: '', senha: ''};

  constructor(public nav: NavController, public cadastro: LoginService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {}

  termos() {
    this.nav.push(Termos);
  }

  privacidade() {
    this.nav.push(Privacidade);
  }

  // Cadastrar usuário
  cadastrar() {
    const loading = this.loadingCtrl.create({content: 'Aguarde...'}); 
    loading.present().then(()=>{
    this.cadastro.cadastrar(this.jsonToURLEncoded({
      nome: this.dados.nome,
      sobrenome: this.dados.sobrenome,
      email: this.dados.email,
      telefone: this.dados.telefone,
      senha: this.dados.senha
	})).subscribe(retorno => {
        if (retorno.resposta == 'cadastrou') {
            loading.dismiss();
            this.nav.popToRoot();
            this.alerta("Cadastrado com sucesso");
        } else {
            loading.dismiss();
            this.alerta("Erro ao cadastrar");
        }
    }, error => {
      loading.dismiss();
      this.alerta(error);
    });
    });
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  // Toast
  alerta(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
