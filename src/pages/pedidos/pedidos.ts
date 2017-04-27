import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { PedidosService } from '../../providers/pedidos-service';
import { Detalhes } from '../detalhes/detalhes';

@Component({
  selector: 'pagina-pedidos',
  templateUrl: 'pedidos.html'
})
export class Pedidos {
  pedidos: any[];

  constructor(private nav: NavController, private service: PedidosService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.listarPedidos();
  }

  // Pegar o id do pedido e da loja e o nome do produto, e exibe na página de Detalhes
  public detalhes(id, loja, nome_loja, rua_loja, nome_produto, foto_produto) {
    this.nav.push(Detalhes, {
      id_pedido: id,
      id_loja: loja,
      nome_loja: nome_loja,
      rua_loja: rua_loja,
      nome_produto: nome_produto,
      foto_produto: foto_produto
    });
  }

  // Lista os pedidos
  listarPedidos() {
    this.service.listar(this.jsonToURLEncoded({
        id_usuario: 2
    })).subscribe(retorno => {
        this.pedidos = retorno;
    }, error => {
        this.alerta(error);
    });
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  // Toast
  alerta(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
