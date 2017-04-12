import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController) {

  }

  slides = [
    {
      title: "Cadastre-se",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#27afb7"
    },
    {
      title: "Realize compras",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#f55b5c"
    },
    {
      title: "Acesse a loja",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#3498db"
    }
  ];

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
