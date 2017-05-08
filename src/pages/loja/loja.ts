import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { LojaService } from '../../providers/loja-service';
import { PesquisaService } from '../../providers/pesquisa-service';
import { DetalhesProduto } from '../detalhes/detalhes-produto';
import { Categorias } from '../loja/categorias';

@Component({
  selector: 'pagina-loja',
  templateUrl: 'loja.html'
})
export class Loja {
  showSearchBar: boolean = false;
  pesquisa: string = '';
  produto = []; // searchbar

  produtos: any;
  produtos_pesquisa: any[]; // searchbar

  items = [];

  nome_loja = this.params.get('nome_loja');

  constructor(public nav: NavController, public serviceLoja: LojaService, public servicePesquisa: PesquisaService, public toastCtrl: ToastController, public params: NavParams) {
    this.getProdutos();
  }

  public toggleShowSearchBar() {
    this.produto = [];
    this.showSearchBar = !this.showSearchBar;
    this.pesquisa = '';
  }

  public atualizar() {
    this.getProdutos();
  }

  carregar_mais(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.items.length);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  public detalhes(produto) {
    this.nav.push(DetalhesProduto, {
      loja: produto.id_loja,
      produto: produto.id,
      foto: produto.foto_produto,
      nome: produto.nome_produto,
      descricao: produto.descricao
    });
  }

  public categorias() {
    this.nav.push(Categorias, {
      loja: this.params.get('id_loja')
    });
  }

  getProdutos() {
    this.serviceLoja.listarProdutos(this.jsonToURLEncoded({
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

  public produto_loja(input) {
    let produto = input.target.value;

    if (produto && produto.length >= 4) {
      this.servicePesquisa.produto(this.jsonToURLEncoded({
        loja: this.params.get('id_loja'),
        produto: produto
      })).subscribe(retorno => {
        this.produtos_pesquisa = retorno.produtos;
      }, error => {
        this.alerta('Erro ao realizar busca, tente novamente');
      });
    }
  }

  public detalhes_produto_loja(produto) {
    this.nav.push(DetalhesProduto, {
        produto: produto.id,
        nome: produto.nome
    });
  }

  public cancelar() {
    this.produto = [];
    this.showSearchBar = !this.showSearchBar;
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
