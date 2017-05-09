import { Component } from '@angular/core';
import { LoadingController, ToastController, NavParams } from 'ionic-angular';
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

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public params: NavParams, public service: DetalhesService) {
    this.detalhes();
  }

  detalhes() {
    let loading = this.loadingCtrl.create({content: 'Carregando...'});
    loading.present().then(() => {
      this.service.produtoFotosProduto(this.jsonToURLEncoded({
        estabelecimento: this.params.get('estabelecimento'),
        produto: this.params.get('produto')
      })).subscribe(retorno => {
        this.fotos = retorno;
        loading.dismiss();
      }, error => {
        this.alerta(error);
        loading.dismiss();
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
