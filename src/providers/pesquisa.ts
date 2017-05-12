import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PathProvider } from './path';

import 'rxjs/add/operator/map';

@Injectable()
export class PesquisaProvider {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PathProvider) {}

  public estabelecimento(estabelecimento) {
      return this.http.get(this.path.url() + 'pesquisa/estabelecimento?' + estabelecimento, this.options).map(res => res.json())
  }

  public produto(dados) {
      return this.http.get(this.path.url() + 'pesquisa/produto?estabelecimento=' + dados.estabelecimento + '&produto=' + dados.produto, this.options).map(res => res.json())
  }
}