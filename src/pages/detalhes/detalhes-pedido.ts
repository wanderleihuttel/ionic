import { Component } from '@angular/core';
import { ToastController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DetalhesService } from '../../providers/detalhes-service';

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
  loja = this.params.get('nome_loja');
  bairro = this.params.get('bairro');
  rua = this.params.get('rua');
  numero = this.params.get('numero');

  constructor(private statusBar: StatusBar, public service: DetalhesService, public toastCtrl: ToastController, public params: NavParams) {
    this.getDetalhes();
      
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

  getDetalhes() {
    this.service.pedidoFotosProduto(this.jsonToURLEncoded({
        loja: this.params.get('loja'),
        pedido: this.params.get('pedido')
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
