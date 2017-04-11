import { NgModule } from '@angular/core';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  exports: [
    LoginPage
  ]
})
export class LoginModule {}
