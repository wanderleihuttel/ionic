import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Toast {
  mensagem = '';

  constructor(public toastCtrl: ToastController) {}

  alerta() {
    let toast = this.toastCtrl.create({
      message: this.mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
  