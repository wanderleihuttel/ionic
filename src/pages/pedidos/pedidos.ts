import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { PedidosService } from '../../providers/pedidos-service';
import { Detalhes } from '../detalhes/detalhes';

@Component({
  selector: 'pagina-pedidos',
  templateUrl: 'pedidos.html'
})
export class Pedidos {
    
  constructor(private nav: NavController, private pedidos: PedidosService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
      this.listarPedidos();
  }

  // Página para exibir os detalhes do pedido
  public detalhes() {
    this.nav.push(Detalhes);
  }

  // Lista os pedidos
  listarPedidos() {
    this.pedidos.listar(this.jsonToURLEncoded({
        id_usuario: 2,
    })).subscribe(retorno => {
        console.log(retorno);
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
