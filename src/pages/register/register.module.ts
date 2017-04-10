import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterModule {}
