import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { EstabelecimentoService } from '../../providers/estabelecimento-service';
import { PesquisaService } from '../../providers/pesquisa-service';
import { Toast } from '../../providers/toast';
import { DetalhesProduto } from '../detalhes/detalhes-produto';
import { Categorias } from '../estabelecimento/categorias';

@Component({
  selector: 'pagina-estabelecimento',
  templateUrl: 'estabelecimento.html'
})
export class Estabelecimento {
  public refresher: boolean = true;
  showSearchBar: boolean = false;
  pesquisa: string = '';
  produto = []; // searchbar

  produtos: any;
  produtos_pesquisa: any[]; // searchbar

  items = []; // infinite scroll

  nome_estabelecimento = this.params.get('nome_estabelecimento');

  constructor(public nav: NavController, public loadingCtrl: LoadingController, public params: NavParams, public estabelecimento: EstabelecimentoService, public servicePesquisa: PesquisaService, public toast: Toast) {
    this.listarProdutos();
  }

  public toggleShowSearchBar() {
    this.produto = [];
    this.showSearchBar = !this.showSearchBar;
    this.pesquisa = '';
  }

  public atualizar(refresher) {
      setTimeout(() => {
        refresher.complete();
        this.listarProdutos();
      }, 500);
  }

  carregar_mais(infiniteScroll) {
    console.log('Iniciou a operação assíncrona');

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.items.push(this.items.length);
      }

      console.log('A operação assíncrona terminou');
      infiniteScroll.complete();
    }, 500);
  }

  public detalhes(produto) {
    this.nav.push(DetalhesProduto, {
      estabelecimento: produto.id_loja,
      produto: produto.id,
      foto: produto.foto,
      nome: produto.nome,
      descricao: produto.descricao
    });
  }

  public categorias() {
    this.nav.push(Categorias, {
      estabelecimento: this.params.get('estabelecimento')
    });
  }

  listarProdutos() {
    let loading = this.loadingCtrl.create({content: 'Carregando...'});

    if (this.refresher) {
      loading.present();
      this.refresher = false;
    }

    this.estabelecimento.listarProdutos(this.jsonToURLEncoded({
        estabelecimento: this.params.get('estabelecimento')
    })).subscribe(retorno => {
        if (retorno.resposta === 'erro') {
          console.log('Esta loja não possui produtos cadastrados em nosso sistema');
        } else {
          this.produtos = retorno.produtos;
        }
        loading.dismiss();
    }, error => {
        this.toast.alerta(error);
        loading.dismiss();
    });
  }

  public produto_estabelecimento(input) {
    let produto = input.target.value;

    if (produto && produto.length >= 4) {
      this.servicePesquisa.produto(this.jsonToURLEncoded({
        estabelecimento: this.params.get('estabelecimento'),
        produto: produto
      })).subscribe(retorno => {
        this.produtos_pesquisa = retorno.produtos;
      }, error => {
        this.toast.alerta('Erro ao realizar busca, tente novamente');
      });
    }
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
}
