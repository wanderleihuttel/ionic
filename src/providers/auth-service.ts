import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Usuario {
  nome: string;
  email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  usuario: Usuario;

  public logar(dados) {
    if (dados.email === null || dados.senha === null) {
      return Observable.throw("Preencha todos os campos");
    } else {
      return Observable.create(observer => {
        let access = (dados.email === "123" && dados.senha === "123");
        this.usuario = new Usuario('Jonathan', 'teste@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public cadastrar(dados) {
    if (dados.nome === null || dados.email === null || dados.senha === null || dados.confirma_senha === null) {
      return Observable.throw("Preencha todos os campos");
    } else if (dados.confirma_senha != dados.senha) {
      return Observable.throw("Senhas diferentes");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUsuarioDados() : Usuario {
    return this.usuario;
  }

  public sair() {
    return Observable.create(observer => {
      this.usuario = null;
      observer.next(true);
      observer.complete();
    });
  }
}
