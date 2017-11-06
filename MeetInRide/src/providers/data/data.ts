import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  public username: string;
  public watchPos: any;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

}
