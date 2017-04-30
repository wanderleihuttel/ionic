import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Home } from '../home/home';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {

  tabHome = Home;
  tabPedidos = Pedidos;
  tabPerfil = Perfil;

  constructor(public params : NavParams) {}
}