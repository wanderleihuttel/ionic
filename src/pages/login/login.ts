import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { Cadastro } from '../cadastro/cadastro';
import { RecuperarSenha } from '../recuperar-senha/recuperar-senha';

import { TabsService } from '../../providers/tabs-service';
import { Tabs } from '../tabs/tabs';

import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-login',
  templateUrl: 'login.html'
})
export class Login {
  dados = {email: '', senha: ''};

  // Expressão regular
  er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

  constructor(public tabs: TabsService, public nav: NavController, public login: LoginService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {}

  /*ionViewDidEnter() {
    this.tabs.hide();
  }

  ionViewDidLeave() {
    this.tabs.show();
  }*/

  // Página de cadastro
  public cadastro() {
    this.nav.push(Cadastro);
  }

  // Página de recuperar senha
  public recuperar() {
    this.nav.push(RecuperarSenha);
  }

  // Logar
  public logar() {
    const loading = this.loadingCtrl.create({content: 'Aguarde...'}); 
    loading.present().then(()=>{
    if (!this.er.exec(this.dados.email)) {
        loading.dismiss();
        this.alerta("E-mail inválido");
    } else {
        this.login.logar(this.jsonToURLEncoded({
            email: this.dados.email,
            senha: this.dados.senha
        })).subscribe(retorno => {
            if (retorno.resposta == 'logou') {
            
              const dadosUsuario = {id: retorno.id, codigo: retorno.codigo, nome: retorno.nome, sobrenome: retorno.sobrenome, email: this.dados.email};
              localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
            
              this.nav.setRoot(Tabs);
            } else {
              this.alerta("E-mail ou senha inválido");
            }
            loading.dismiss();
        }, error => {
            loading.dismiss();
            this.alerta("Erro ao conectar, tente mais tarde");
        });
    }
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
