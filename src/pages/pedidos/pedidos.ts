import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Detalhes } from '../detalhes/detalhes';

@Component({
  selector: 'pagina-pedidos',
  templateUrl: 'pedidos.html'
})
export class Pedidos {

  constructor(private nav: NavController) {}

  public detalhes() {
    this.nav.push(Detalhes);
  }
}
