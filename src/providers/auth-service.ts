import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PATH } from './path';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http, private path: PATH) {}

  public logar(dados) {}

  public cadastrar(dados) {
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
      let options = new RequestOptions({headers: headers});
      let link = this.path.getUrl + 'cadastrar';
      //let link = 'http://app.com.br/api/cadastrar';

      return this.http.post(link, dados, options).map(res => res.json())
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
