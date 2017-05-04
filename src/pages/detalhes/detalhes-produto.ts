import { Component } from '@angular/core';
import { ToastController, NavParams } from 'ionic-angular';
import { DetalhesService } from '../../providers/detalhes-service';

@Component({
  selector: 'pagina-detalhes-produto',
  templateUrl: 'detalhes-produto.html'
})
export class DetalhesProduto {
  fotos: any;

  nome_produto = this.params.get('nome_produto');
  foto_produto = this.params.get('foto_produto');
  descricao = this.params.get('descricao');

  constructor(public service: DetalhesService, public toastCtrl: ToastController, public params: NavParams) {
    this.getDetalhes();
  }

  getDetalhes() {
    this.service.listarDetalhes(this.jsonToURLEncoded({
        id_loja: this.params.get('id_loja'),
        id_produto: this.params.get('id_produto')
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
