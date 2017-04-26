import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalhesService } from '../../providers/detalhes-service';

@Component({
  selector: 'pagina-detalhes',
  templateUrl: 'detalhes.html'
})
export class Detalhes {
  detalhes: any[];
  id_pedido = '';
  id_loja = '';
  nome = '';

  constructor(private nav: NavController, private service: DetalhesService, private navParams: NavParams) {
      //this.getDetalhes();
      
      this.nome = navParams.get('nome');
      this.id_pedido = navParams.get('id_pedido');
      this.id_loja = navParams.get('id_loja');
  }

  getDetalhes() {    
    /*this.service.listarDetalhes(this.jsonToURLEncoded({
        id_pedido: this.id_pedido,
        id_loja: this.id_loja
    })).subscribe(retorno => {
        this.detalhes = retorno;
    }, error => {
        console.log(error);
    });*/
  }

  /*private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }*/

}
