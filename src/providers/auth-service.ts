import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  data: any;

  constructor(private http: Http, private alert: AlertController, private loading: LoadingController) {
    this.data = null;
  }

  // Logar
  public logar(dados) {
    if (dados.email === null || dados.senha === null) {
      console.log("Preencha todos os campos");
    } else {
      /*return Observable.create(observer => {
        let acesso = (dados.email === "123" && dados.senha === "123");
        this.usuario = new Usuario('JS0101', 'Jonathan Nunes da Silva', 'teste@gmail.com');
        observer.next(acesso);
        observer.complete();
      });*/
    }
  }

  // Cadastrar usuário
  public cadastrar(dados) {
    /*if (dados.nome === null
        || dados.sobrenome === null
        || dados.email === null
        || dados.confirma_email === null
        || dados.senha === null
        || dados.confirma_senha === null) {

      console.log("Preencha todos os campos");

    } else if (dados.confirma_senha != dados.senha) {
      console.log("Senha diferente");

    } else if (dados.confirma_email != dados.email) {
      console.log("E-mail diferente");

    } else {*/

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
      let options = new RequestOptions({headers: headers});

      let link = 'http://app.com.br/api/cadastrar';

      return this.http.post(link, dados, options)
          .map(data => {
          //.subscribe(data => {
            this.data = data.json();

            let loader = this.loading.create({
              content: 'Aguarde! Cadastrando...',
              duration: 1000
            });
            loader.present();
            console.log(data);
          
          }, error => {
            let alert = this.alert.create({
              title: 'Erro',
              subTitle: 'Erro ao cadastrar!',
              buttons: ['OK']
            });
            alert.present();
            console.log(error);
          });

    //}
  }

  // Recuperar senha
  /*public recuperar_senha(dados) {
    if (dados.email === null) {
      return Observable.throw("Informe seu e-mail");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  // Dados do usuário
  public getUsuarioDados() : Usuario {
    return this.usuario;
  }*/

  // Deslogar
  /*public sair() {
    return Observable.create(observer => {
      this.usuario = null;
      observer.next(true);
      observer.complete();
    });
  }*/
}
