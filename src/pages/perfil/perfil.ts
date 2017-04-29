import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AtualizarSenha } from '../atualizar-senha/atualizar-senha';

@Component({
  selector: 'pagina-perfil',
  templateUrl: 'perfil.html'
})
export class Perfil {

  constructor(public nav: NavController, public alertCtrl: AlertController) {}

  public atualizar_dados() {}
    
  public deletar_conta() {
    let prompt = this.alertCtrl.create({
      inputs: [
        {
          name: 'senha',
          placeholder: 'Senha'
        },
        {
          name: 'confirma_senha',
          placeholder: 'Senha novamente'  
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log("Clicou em Cancelar");
          }
        },
        {
          text: 'Deletar',
          handler: data => {
            console.log("Clicou em Deletar");
          }
        }
      ]
    });
    prompt.present();
  }
    
  public trocar_senha() {
    this.nav.push(AtualizarSenha);
  }
}
