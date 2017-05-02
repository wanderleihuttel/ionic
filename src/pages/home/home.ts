import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';

import { Login } from '../login/login';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';

import { PesquisaService } from '../../providers/pesquisa-service';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  showSearchBar: boolean = false;  
  pesquisa: string = '';
    
  usuario: {};
    
  lojas: any[];

  constructor(public nav: NavController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public toastCtrl: ToastController, public service: PesquisaService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  public toggleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  public more() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartilhar',
          icon: 'share',
          handler: () => {
            console.log('Compartilhar');
          }
        },{
          text: 'Pedidos',
          icon: 'create',
          handler: () => {
            this.nav.push(Pedidos);
          }
        },{
          text: 'Perfil',
          icon: 'person',
          handler: () => {
            this.nav.push(Perfil);
          }
        },{
          text: 'Sair',
          icon: 'log-out',
          handler: () => {
            this.deslogar();
          }
        }
      ]
    });
    actionSheet.present();
  }

  deslogar() {
    const alert = this.alertCtrl.create({
      message: 'Deseja sair da sua conta?',
      buttons: [
        {
          text: 'Não',
          handler: () => {}
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.setRoot(Login);
          }
        }
      ]
    });
    
    alert.present();
  }

  public loja(input) {
    let loja = input.target.value;

    if (loja && loja.trim() != '') {
      if (loja.length >= 4) {
        this.service.pesquisa(this.jsonToURLEncoded({
          nome: loja
        })).subscribe(retorno => {
          this.lojas = retorno.loja;
        }, error => {
          this.alerta('Erro ao realizar busca, tente novamente');
        });   
      } 
    }
  }
    
  public onCancel() {
    this.showSearchBar = !this.showSearchBar;
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
