import { Injectable } from '@angular/core';

@Injectable()
export class PathProvider {
  link = '';

  constructor() {
    this.link = 'http://app.com.br/api/';
    //this.link = 'http://10.0.0.8/api/';
  }

  url() {
    return this.link;
  }
}
