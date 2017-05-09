import { Injectable } from '@angular/core';

@Injectable()
export class PathProvider {
  link = '';

  constructor() {
    this.link = 'http://app.com.br/api/';
  }

  url() {
    return this.link;
  }
}
