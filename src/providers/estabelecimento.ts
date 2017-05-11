import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { PathProvider } from './path';

import 'rxjs/add/operator/map';

@Injectable()
export class EstabelecimentoProvider {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PathProvider) {}

  public listarProdutos(dados) {
      return this.http.get(this.path.url() + 'produtos', dados, this.options).map(res => res.json())
  }

  public produtosCategoria(dados) {
      return this.http.get(this.path.url() + 'produtos-categoria', dados, this.options).map(res => res.json())
  }
}
