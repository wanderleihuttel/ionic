import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'pagina-detalhes',
  templateUrl: 'detalhes.html'
})
export class Detalhes {

  constructor(private nav: NavController) {}

  slides = [
    {
      image: "assets/produtos/bicicletaCaloi1.jpg"
    },
    {
      image: "assets/produtos/bicicletaCaloi2.jpg"
    },
    {
      image: "assets/produtos/bicicletaCaloi3.jpg"
    }
  ];
}
