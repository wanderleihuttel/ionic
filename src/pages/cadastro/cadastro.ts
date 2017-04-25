import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html'
})
export class Cadastro {
  dados = {nome: '', sobrenome: '', email: '', senha: ''};

  constructor(private nav: NavController, private cadastro: LoginService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {}

  // Cadastrar usuário
  cadastrar() {
    const loading = this.loadingCtrl.create({content: 'Aguarde...'}); 
    loading.present().then(()=>{
    this.cadastro.cadastrar(this.jsonToURLEncoded({
      nome: this.dados.nome,
      sobrenome: this.dados.sobrenome,
      email: this.dados.email,
      senha: this.dados.senha
	})).subscribe(retorno => {
        if (retorno.resposta == 'cadastrou') {
            loading.dismiss();
            this.nav.popToRoot();
            console.log("Cadastrado com sucesso");
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
