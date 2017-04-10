import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController) {

  }

  slides = [
    {
      title: "Slide 1",
      description: "Teste de descrição",
      image: "assets/img/ionic.png",
    },
    {
      title: "Slide 2",
      description: "Teste de descrição",
      image: "assets/img/ionic.png",
    },
    {
      title: "Slide 3",
      description: "Teste de descrição",
      image: "assets/img/ionic.png",
    }
  ];

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
