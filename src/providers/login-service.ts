import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PATH } from './path';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PATH) {}

  public logar(dados) {
      return this.http.post(this.path.getUrl() + 'logar', dados, this.options).map(res => res.json())
  }

  public cadastrar(dados) {
      return this.http.post(this.path.getUrl() + 'cadastrar', dados, this.options).map(res => res.json())
  }

  public recuperar(dados) {
      return this.http.post(this.path.getUrl() + 'recuperar', dados, this.options).map(res => res.json())
  }
}
