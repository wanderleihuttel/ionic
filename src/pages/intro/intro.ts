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
      title: "Título 1",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#E64A19"
    },
    {
      title: "Título 2",
      description: "Teste de descrição",
      image: "assets/img/logotipo-cinza.png",
      background: "#FF5722"
    }
  ];

  public login(){
    this.navCtrl.setRoot(Login);
  }

}
