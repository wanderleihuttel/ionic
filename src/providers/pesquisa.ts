import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PathProvider } from './path';

import 'rxjs/add/operator/map';

@Injectable()
export class PesquisaProvider {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PathProvider) {}

  public estabelecimento(dados) {
      return this.http.post(this.path.url() + 'pesquisa/estabelecimento', dados, this.options).map(res => res.json())
  }

  public produto(dados) {
      return this.http.post(this.path.url() + 'pesquisa/produto', dados, this.options).map(res => res.json())
  }
}
