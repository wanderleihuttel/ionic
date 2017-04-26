import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { DetalhesService } from '../../providers/detalhes-service';

@Component({
  selector: 'pagina-detalhes',
  templateUrl: 'detalhes.html'
})
export class Detalhes {
  detalhes: any[];
  id_pedido = this.params.get('id_pedido');
  nome_produto = this.params.get('nome_produto');

  constructor(private nav: NavController, private service: DetalhesService, private toastCtrl: ToastController, private params: NavParams) {
    this.getDetalhes();
  }

  getDetalhes() {
    this.service.listarDetalhes(this.jsonToURLEncoded({
        id_pedido: this.params.get('id_pedido'),
        id_loja: this.params.get('id_loja')
    })).subscribe(retorno => {
        this.detalhes = retorno;
    }, error => {
        this.alerta(error);
    });
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  alerta(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
