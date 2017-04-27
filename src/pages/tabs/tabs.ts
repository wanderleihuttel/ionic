import { Component } from '@angular/core';

import { Home } from '../home/home';
import { Pedidos } from '../pedidos/pedidos';
import { Perfil } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root = Home;
  tab2Root = Pedidos;
  tab3Root = Perfil;

  constructor() {}
}