import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { Toast } from '../../providers/toast';
import { Cadastro } from '../cadastro/cadastro';
import { RecuperarSenha } from '../senha/recuperar-senha';
import { Home } from '../home/home';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-login',
  templateUrl: 'login.html'
})
export class Login {
  dados = {email: '', senha: ''};

  // Expressão regular
  er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

  constructor(public nav: NavController, public login: LoginService, public loadingCtrl: LoadingController, public toast: Toast) {}

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
        this.toast.alerta("E-mail inválido");
    } else {
        this.login.logar(this.jsonToURLEncoded({
            email: this.dados.email,
            senha: this.dados.senha
        })).subscribe(retorno => {
            if (retorno.resposta == 'logou') {

              const dadosUsuario = {id: retorno.id, codigo: retorno.codigo, nome: retorno.nome, sobrenome: retorno.sobrenome, email: this.dados.email};
              localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

              this.nav.setRoot(Home);
            } else {
              this.toast.alerta("E-mail ou senha inválido");
            }
            loading.dismiss();
        }, error => {
            loading.dismiss();
            this.toast.alerta("Erro ao conectar, tente mais tarde");
        });
    }
    });
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
