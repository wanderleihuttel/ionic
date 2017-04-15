import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Usuario {
  codigo: string;
  nome: string;
  email: string;

  constructor(codigo: string, nome: string, email: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  usuario: Usuario;

  // Logar
  public logar(dados) {
    if (dados.email === null || dados.senha === null) {
      return Observable.throw("Preencha todos os campos");
    } else {
      return Observable.create(observer => {
        let acesso = (dados.email === "123" && dados.senha === "123");
        this.usuario = new Usuario('JS0101', 'Jonathan Nunes da Silva', 'teste@gmail.com');
        observer.next(acesso);
        observer.complete();
      });
    }
  }

  // Cadastrar usuário
  public cadastrar(dados) {
    if (dados.nome === null || dados.sobrenome === null || dados.email === null || dados.senha === null || dados.confirma_senha === null) {
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

  // Recuperar senha
  public recuperar_senha(dados) {
    if (dados.email === null) {
      return Observable.throw("Informe seu e-mail");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  // Dados do usuário
  public getUsuarioDados() : Usuario {
    return this.usuario;
  }

  // Deslogar
  public sair() {
    return Observable.create(observer => {
      this.usuario = null;
      observer.next(true);
      observer.complete();
    });
  }
}
