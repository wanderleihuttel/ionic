import { Component } from '@angular/core';
import { ToastController, NavParams } from 'ionic-angular';
import { DetalhesService } from '../../providers/detalhes-service';

@Component({
  selector: 'pagina-detalhes-pedido',
  templateUrl: 'detalhes-pedido.html'
})
export class DetalhesPedido {
  fotos: any;

  id_pedido = this.params.get('id_pedido');
  foto_produto = this.params.get('foto_produto');
  nome_loja = this.params.get('nome_loja');
  bairro_loja = this.params.get('bairro_loja');
  rua_loja = this.params.get('rua_loja');
  numero_loja = this.params.get('numero_loja');
  nome_produto = this.params.get('nome_produto');

  constructor(public service: DetalhesService, public toastCtrl: ToastController, public params: NavParams) {
    this.getDetalhes();
  }

  getDetalhes() {
    this.service.listarDetalhes(this.jsonToURLEncoded({
        id_pedido: this.params.get('id_pedido'),
        id_loja: this.params.get('id_loja')
    })).subscribe(retorno => {
        this.fotos = retorno;
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
