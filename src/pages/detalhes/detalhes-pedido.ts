import { Component } from '@angular/core';
import { LoadingController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DetalhesService } from '../../providers/detalhes-service';
import { Toast } from '../../providers/toast';

@Component({
  selector: 'pagina-detalhes-pedido',
  templateUrl: 'detalhes-pedido.html'
})
export class DetalhesPedido {
  fotos: any;  
    
  pedido = this.params.get('pedido');
  status = this.params.get('status');
  foto = this.params.get('foto');
  produto = this.params.get('nome_produto');
  estabelecimento = this.params.get('nome_estabelecimento');
  bairro = this.params.get('bairro');
  rua = this.params.get('rua');
  numero = this.params.get('numero');

  constructor(public loadingCtrl: LoadingController, public params: NavParams, public statusBar: StatusBar, public service: DetalhesService, public toast: Toast) {
    this.detalhes();
      
    switch (this.status) {
	  case 0:
		this.statusBar.backgroundColorByHexString("#616161");
		break;
	  case 1:
		this.statusBar.backgroundColorByHexString("#FBC02D");
        break;
      case 2:
        this.statusBar.backgroundColorByHexString("#388E3C");
        break;
	}
  }

  detalhes() {
    let loading = this.loadingCtrl.create({content: 'Carregando...'});
    loading.present().then(() => {
      this.service.pedidoFotosProduto(this.jsonToURLEncoded({
        estabelecimento: this.params.get('estabelecimento'),
        pedido: this.params.get('pedido')
      })).subscribe(retorno => {
        this.fotos = retorno;
        loading.dismiss();
      }, error => {
        this.toast.alerta(error);
        loading.dismiss();
      });
    });
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
