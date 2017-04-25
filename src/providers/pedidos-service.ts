import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PATH } from './path';
import 'rxjs/add/operator/map';

@Injectable()
export class PedidosService {
  headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http, private path: PATH) {}

  public listar(dados) {
      return this.http.post(this.path.getUrl() + 'pedidos', dados, this.options).map(res => res.json())
  }
}