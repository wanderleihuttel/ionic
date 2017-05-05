import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';

@Component({
  selector: 'pagina-categorias',
  templateUrl: 'categorias.html'
})
export class Categorias {
  categorias: any;

  //nome_loja = this.params.get('nome_loja');

  constructor(public nav: NavController, public toastCtrl: ToastController, public params: NavParams) {
    this.getCategorias();
  }

  getCategorias() {
    this.categorias = [
      {nome: 'Arte e artesanato', id: 1},
      {nome: 'Brinquedos e Hobbies', id: 2},
      {nome: 'Calçados, Roupas e Bolsas', id: 3},
      {nome: 'Câmeras e Acessórios', id: 4},
      {nome: 'Móveis e Decoração', id: 5},
      {nome: 'Celulares e Telefones', id: 6},
      {nome: 'Eletrodomésticos', id: 7},
      {nome: 'Eletrônicos, Áudio e Vídeo', id: 8},
      {nome: 'Esportes e Fitness', id: 9},
      {nome: 'Games', id: 10},
      {nome: 'Informática', id: 11},
      {nome: 'Ingressos', id: 12},
      {nome: 'Joias e Relógios', id: 13},
      {nome: 'Saúde e Beleza', id: 14}
    ]
  }

  public categoria(dados) {
    console.log(dados.id);
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
