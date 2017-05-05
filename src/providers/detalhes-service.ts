import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PATH } from './path';
import 'rxjs/add/operator/map';

@Injectable()
export class DetalhesService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PATH) {}

  public pedidoFotosProduto(dados) {
      return this.http.post(this.path.getUrl() + 'pedido', dados, this.options).map(res => res.json())
  }

  public produtoFotosProduto(dados) {
      return this.http.post(this.path.getUrl() + 'produto', dados, this.options).map(res => res.json())
  }
}
