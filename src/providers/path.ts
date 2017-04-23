import { Injectable } from '@angular/core';

@Injectable()
export class PATH {
  link = '';

  constructor() {
    this.link ='http://app.com.br/api/';
  }

  getUrl() {
    return this.link;
  }
}
