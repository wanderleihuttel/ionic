import { Component } from '@angular/core'; //ViewChild
import { NavController, ActionSheetController, AlertController } from 'ionic-angular'; //Searchbar

import { Login } from '../login/login';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';
import { Estabelecimento } from '../estabelecimento/estabelecimento';

import { PesquisaProvider } from '../../providers/pesquisa';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  //@ViewChild('searchbar') searchbar: Searchbar;

  showSearchBar: boolean = false;
  pesquisa: string = '';

  usuario: {};

  estabelecimentos: any[];

  constructor(public nav: NavController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public pesquisaProvider: PesquisaProvider, public toast: ToastProvider) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  public toggleShowSearchBar() {
    this.estabelecimentos = [];
    this.showSearchBar = !this.showSearchBar;
    this.pesquisa = '';
    /*setTimeout(()=>{
      this.searchbar.setFocus();
    }, 200);*/
  }

  public menu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
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

  public estabelecimento(input) {
    let estabelecimento = input.target.value;

    if (estabelecimento && estabelecimento.length >= 4) {
      this.pesquisaProvider.estabelecimento(this.jsonToURLEncoded({
        estabelecimento: estabelecimento
      })).subscribe(retorno => {
        this.estabelecimentos = retorno.estabelecimentos;
      }, error => {
        this.toast.alerta('Erro ao realizar busca, tente novamente');
      });
    }
  }

  public produtos_estabelecimento(estabelecimento) {
    this.nav.push(Estabelecimento, {
        estabelecimento: estabelecimento.id,
        nome_estabelecimento: estabelecimento.nome
    });
  }

  public cancelar() {
    this.estabelecimentos = [];
    this.showSearchBar = !this.showSearchBar;
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }
}
