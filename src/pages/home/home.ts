import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';

import { Login } from '../login/login';
//import { Pedidos } from '../pedidos/pedidos';
//import { Perfil } from '../perfil/perfil';

import { LoginService } from '../../providers/login-service';

@Component({
  selector: 'pagina-home',
  templateUrl: 'home.html'
})
export class Home {
  public showSearchBar: boolean = false;    
  usuario: {};

  constructor(public nav: NavController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public login: LoginService) {
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
          role: 'share',
          handler: () => {
            console.log('Compartilhar');
          }
        },{
          text: 'Sair',
          role: 'log-out',
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

  public onInput() {}

  public onCancel() {
    this.showSearchBar = !this.showSearchBar;
  }
}
