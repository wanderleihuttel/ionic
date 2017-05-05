import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { PedidosService } from '../../providers/pedidos-service';
import { DetalhesPedido } from '../detalhes/detalhes-pedido';

@Component({
  selector: 'pagina-pedidos',
  templateUrl: 'pedidos.html'
})
export class Pedidos {
  pedidos: any;
  cliente: any;

  constructor(public nav: NavController, public service: PedidosService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.cliente = JSON.parse(localStorage.getItem('usuario'));
    this.listarPedidos();
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
    loading.present().then(()=>{
        this.service.listar(this.jsonToURLEncoded({
            cliente: cliente.id
        })).subscribe(retorno => {
            this.pedidos = retorno;
            
            loading.dismiss();
        }, error => {
            loading.dismiss();
            this.alerta(error);
        });
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
