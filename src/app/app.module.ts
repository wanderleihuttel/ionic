import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { App } from './app.component';

// Páginas
import { Login } from '../pages/login/login';
import { Cadastro } from '../pages/cadastro/cadastro';
import { RecuperarSenha } from '../pages/senha/recuperar-senha';
import { AtualizarSenha } from '../pages/senha/atualizar-senha';
import { Termos } from '../pages/termos/termos';
import { Privacidade } from '../pages/privacidade/privacidade';
import { DetalhesPedido } from '../pages/detalhes/detalhes-pedido';
import { DetalhesProduto } from '../pages/detalhes/detalhes-produto';
import { Home } from '../pages/home/home';
import { Pedidos } from '../pages/pedidos/pedidos';
import { Perfil } from '../pages/perfil/perfil';
import { Estabelecimento } from '../pages/estabelecimento/estabelecimento';
import { Categorias } from '../pages/estabelecimento/categorias';
import { ProdutosCategoria } from '../pages/estabelecimento/produtos-categoria';

// Providers
import { LoginProvider } from '../providers/login';
import { PedidosProvider } from '../providers/pedidos';
import { DetalhesProvider } from '../providers/detalhes';
import { PesquisaProvider } from '../providers/pesquisa';
import { EstabelecimentoProvider } from '../providers/estabelecimento';
import { PathProvider } from '../providers/path';
import { ToastProvider } from '../providers/toast';

@NgModule({
  declarations: [
    App,
    Login,
    Cadastro,
    RecuperarSenha,
    AtualizarSenha,
    Home,
    Pedidos,
    Perfil,
    Termos,
    Privacidade,
    DetalhesPedido,
    Estabelecimento,
    DetalhesProduto,
    Categorias,
    ProdutosCategoria
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    Login,
    Cadastro,
    RecuperarSenha,
    AtualizarSenha,
    Home,
    Pedidos,
    Perfil,
    Termos,
    Privacidade,
    DetalhesPedido,
    Estabelecimento,
    DetalhesProduto,
    Categorias,
    ProdutosCategoria
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginProvider,
    PedidosProvider,
    DetalhesProvider,
    PesquisaProvider,
    EstabelecimentoProvider,
    PathProvider,
    ToastProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
