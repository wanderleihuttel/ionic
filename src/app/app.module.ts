import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { App } from './app.component';
import { Intro } from '../pages/intro/intro';
import { Login } from '../pages/login/login';
import { Cadastro } from '../pages/cadastro/cadastro';
import { Home } from '../pages/home/home';

import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    App,
    Intro,
    Login,
    Cadastro,
    Home
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    Intro,
    Login,
    Cadastro,
    Home
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService
  ]
})
export class AppModule {}
