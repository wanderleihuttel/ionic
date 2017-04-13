import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';

@Component({
  selector: 'pagina-intro',
  templateUrl: 'intro.html'
})
export class Intro {

  constructor(public navCtrl: NavController) {}

  slides = [
    {
      title: "Cadastre-se",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#e05244"
    },
    {
      title: "Realize compras",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#FF5722"
    }
  ];

  login(){
    this.navCtrl.setRoot(Login);
  }

}
