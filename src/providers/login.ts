import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PathProvider } from './path';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  //headers.append('Authorization', getToken );
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PathProvider) {}

  public logar(dados) {
      return this.http.post(this.path.url() + 'logar', dados, this.options).map(res => res.json())
  }

  public cadastrar(dados) {
      return this.http.post(this.path.url() + 'cadastrar', dados, this.options).map(res => res.json())
  }

  public recuperar(dados) {
      return this.http.post(this.path.url() + 'recuperar', dados, this.options).map(res => res.json())
  }
}
