import { Component } from '@angular/core';

import { Home } from '../home/home';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {

  tabHome = Home;
  tabPedidos = Pedidos;
  tabPerfil = Perfil;

  constructor() {}
}