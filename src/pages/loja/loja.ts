import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { LojaService } from '../../providers/loja-service';
import { DetalhesProduto } from '../detalhes/detalhes-produto';
import { Categorias } from '../loja/categorias';

@Component({
  selector: 'pagina-loja',
  templateUrl: 'loja.html'
})
export class Loja {
  produtos: any;

  nome_loja = this.params.get('nome_loja');

  constructor(public nav: NavController, public service: LojaService, public toastCtrl: ToastController, public params: NavParams) {
    this.getProdutos();
  }

  public detalhes(produto) {
    this.nav.push(DetalhesProduto, {
      id_produto: produto.id,
      id_loja: produto.id_loja,
      nome_produto: produto.nome_produto,
      foto_produto: produto.foto_produto,
      descricao: produto.descricao,
    });
  }

  public categorias() {
    this.nav.push(Categorias, {
      loja: this.params.get('id_loja')
    });
  }

  getProdutos() {
    this.service.listarProdutos(this.jsonToURLEncoded({
        loja: this.params.get('id_loja')
    })).subscribe(retorno => {
        if (retorno.resposta === 'erro') {
          console.log('Esta loja não possui produtos cadastrados em nosso sistema');
        } else {
          this.produtos = retorno.produtos;
        }
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
