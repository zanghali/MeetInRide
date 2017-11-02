import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {

  constructor(public http: Http) {
  }

  isAuthenticated() {
    this.http.get('http://localhost:3000/auth', (res) => {
      res.on('data', (data) => {
        console.log("isAuth: " + data);
      });
    })
  }
}
