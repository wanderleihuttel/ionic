import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pagina-cadastro',
  templateUrl: 'cadastro.html',
  providers:[ AuthService ]
})
export class Cadastro {
  sucesso = false;
  
  dados = {nome: '', sobrenome: '', email: '', senha: ''};

  constructor(private nav: NavController, private auth: AuthService, private alert: AlertController) {}

  cadastrar() {      
    this.auth.cadastrar(this.jsonToURLEncoded({
      nome: this.dados.nome,
      sobrenome: this.dados.sobrenome,
      email: this.dados.email,
      senha: this.dados.senha
	})).subscribe(retorno => {
      if (retorno.resposta == 'cadastrou') {
          this.sucesso = true;
          this.alerta("Sucesso", "Cadastrado com sucesso");
      } else {
        this.alerta("Erro", "Erro ao cadastrar");
      }
        
    },
    error => {
      this.alerta("Error", error);
    });
  }

  private jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  alerta(titulo, mensagem) {
    let alert = this.alert.create({
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
