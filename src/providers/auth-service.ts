import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*export class Usuario {
  codigo: string;
  nome: string;
  email: string;

  constructor(codigo: string, nome: string, email: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
  }
}*/

@Injectable()
export class AuthService {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }
  //usuario: Usuario;

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
    if (dados.nome === null
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

    } else {

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      var link = 'http://app.com.br/api/cadastrar';

      this.http.post(link, dados, options).subscribe(data => {
         this.data = data;

         console.log(data);
      }, error => {
         console.log(error);
      });

    }
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
