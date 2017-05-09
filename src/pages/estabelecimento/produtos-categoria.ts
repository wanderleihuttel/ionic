import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetalhesProduto } from '../detalhes/detalhes-produto';

import { EstabelecimentoProvider } from '../../providers/estabelecimento';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'pagina-produtos-categoria',
  templateUrl: 'produtos-categoria.html'
})
export class ProdutosCategoria {
  produtos: any;

  estabelecimento = this.params.get('nome_estabelecimento');
  nome_categoria = this.params.get('nome_categoria');
  id_categoria = this.params.get('id_categoria');

  constructor(public nav: NavController, public estabelecimentoProvider: EstabelecimentoProvider, public params: NavParams, public toast: ToastProvider) {
    this.listarProdutos();
  }

  public detalhes(produto) {
    this.nav.push(DetalhesProduto, {
      estabelecimento: produto.id_loja,
      produto: produto.id,
      foto: produto.foto_produto,
      nome: produto.nome_produto,
      descricao: produto.descricao
    });
  }

  listarProdutos() {
    this.estabelecimentoProvider.produtosCategoria(this.jsonToURLEncoded({
        estabelecimento: this.estabelecimento,
        categoria: this.id_categoria
    })).subscribe(retorno => {
        if (retorno.resposta === 'erro') {
          console.log('Esta loja não possui produtos cadastrados nesta categoria');
        } else {
          this.produtos = retorno.produtos;
        }
    }, error => {
        this.toast.alerta(error);
    });
  }

  /*public detalhes_produto_loja(produto) {
    this.nav.push(DetalhesProduto, {
        produto: produto.id,
        nome: produto.nome
    });
  }*/

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
