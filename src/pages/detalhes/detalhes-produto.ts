import { Component } from '@angular/core';
import { ToastController, NavParams } from 'ionic-angular';
import { DetalhesService } from '../../providers/detalhes-service';

@Component({
  selector: 'pagina-detalhes-produto',
  templateUrl: 'detalhes-produto.html'
})
export class DetalhesProduto {
  fotos: any;

  foto = this.params.get('foto');
  nome = this.params.get('nome');
  descricao = this.params.get('descricao');

  constructor(public service: DetalhesService, public toastCtrl: ToastController, public params: NavParams) {
    this.getDetalhes();
  }

  getDetalhes() {
    this.service.produtoFotosProduto(this.jsonToURLEncoded({
        loja: this.params.get('loja'),
        produto: this.params.get('produto')
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
