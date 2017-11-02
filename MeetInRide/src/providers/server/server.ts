import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {

  constructor(public http: Http) {
  }

  isAuthenticated() {
    this.http.get('http://localhost:3000/auth').map(res => res.json()).subscribe(data => {
      console.log("isAuth: " + data);
      return data;
    });
  }

  logout() {
    this.http.get('http://localhost:3000/logout').map(res => res.json()).subscribe(data => {
      console.log("logout: " + data);
    });
  }

  updatePosition(username, latitude, longitude) {
    let details = { 'username': username, 'latitude': latitude, 'longitude': longitude };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://localhost:3000/updatePosition", details, options)
      .subscribe(data => {
        console.log("updatePosition: " + (data['_body']));
      });
  }

  getPositions(callback) {
    this.http.get('http://localhost:3000/getPositions').map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }
}
