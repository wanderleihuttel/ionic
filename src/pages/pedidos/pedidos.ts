import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { PedidosService } from '../../providers/pedidos-service';
import { DetalhesPedido } from '../detalhes/detalhes-pedido';

@Component({
  selector: 'pagina-pedidos',
  templateUrl: 'pedidos.html'
})
export class Pedidos {
  public refresher: boolean = true;
  pedidos: any;
  cliente: any;

  items = [];

  constructor(public nav: NavController, public service: PedidosService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.cliente = JSON.parse(localStorage.getItem('usuario'));
    this.listarPedidos();
  }

  public atualizar(refresher) {
      setTimeout(() => {
        refresher.complete();
        this.listarPedidos();
      }, 500);
  }

  carregar_mais(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.items.length);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  // Pegar o id do pedido e da loja e o nome do produto, e exibe na página de Detalhes
  public detalhes(pedido) {
    this.nav.push(DetalhesPedido, {
      pedido: pedido.id,
      status: pedido.status,
      foto: pedido.foto,
      nome_produto: pedido.nome_produto,
      loja: pedido.loja,
      nome_loja: pedido.nome_loja,
      bairro: pedido.bairro,
      rua: pedido.rua,
      numero: pedido.numero
    });
  }

  // Lista os pedidos
  listarPedidos() {
    let cliente = this.cliente;
    let loading = this.loadingCtrl.create({content: 'Carregando...'});

    if (this.refresher) {
      loading.present();
      this.refresher = false;
    }

    this.service.pedidos(this.jsonToURLEncoded({
        cliente: cliente.id
    })).subscribe(retorno => {
        this.pedidos = retorno;

        loading.dismiss();
    }, error => {
        loading.dismiss();
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
