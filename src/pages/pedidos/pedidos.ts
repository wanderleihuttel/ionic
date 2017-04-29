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
  usuario: {};

  constructor(public nav: NavController, public service: PedidosService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario);
    this.listarPedidos();
  }

  // Pegar o id do pedido e da loja e o nome do produto, e exibe na página de Detalhes
  public detalhes(pedido) {
    this.nav.push(Detalhes, {
      id_pedido: pedido.id,
      id_loja: pedido.loja,
      nome_loja: pedido.nome_loja,
      rua_loja: pedido.rua_loja,
      nome_produto: pedido.nome_produto,
      foto_produto: pedido.foto_produto
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
