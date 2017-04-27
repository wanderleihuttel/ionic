import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { App } from './app.component';
import { Intro } from '../pages/intro/intro';
import { Login } from '../pages/login/login';
import { Cadastro } from '../pages/cadastro/cadastro';
import { RecuperarSenha } from '../pages/recuperar-senha/recuperar-senha';
import { AtualizarSenha } from '../pages/atualizar-senha/atualizar-senha';
import { Home } from '../pages/home/home';
import { Pedidos } from '../pages/pedidos/pedidos';
import { Perfil } from '../pages/perfil/perfil';
import { Privacidade } from '../pages/privacidade/privacidade';
import { Detalhes } from '../pages/detalhes/detalhes';

import { LoginService } from '../providers/login-service';
import { PedidosService } from '../providers/pedidos-service';
import { DetalhesService } from '../providers/detalhes-service';

import { PATH } from '../providers/path';

@NgModule({
  declarations: [
    App,
    Intro,
    Login,
    Cadastro,
    RecuperarSenha,
    AtualizarSenha,
    Home,
    Pedidos,
    Perfil,
    Privacidade,
    Detalhes
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
    Intro,
    Login,
    Cadastro,
    RecuperarSenha,
    AtualizarSenha,
    Home,
    Pedidos,
    Perfil,
    Privacidade,
    Detalhes
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    PedidosService,
    DetalhesService,
    PATH
  ]
})
export class AppModule {}
