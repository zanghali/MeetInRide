import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {

  constructor(public http: Http) {
  }

  // Authentication

  isAuthenticated() {
    this.http.get('http://meetinride.ddns.net:3000/auth').map(res => res.json()).subscribe(data => {
      console.log("isAuth: " + data);
      return data;
    });
  }

  login(username, password, callback) {
    let details = { 'username': username, 'password': password };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://meetinride.ddns.net:3000/login", details, options)
      .subscribe(data => {
        callback(null, data);
      }, error => {
        callback(error, null);
      });
  }

  logout() {
    this.http.get('http://meetinride.ddns.net:3000/logout').map(res => res.json()).subscribe(data => {
      console.log("logout: " + data);
    });
  }

  signup(details, callback) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://meetinride.ddns.net:3000/signup", details, options)
      .subscribe(data => {
        callback(null, data);
      }, error => {
        callback(error, null);
      });
  }

  // Position

  updatePosition(username, latitude, longitude) {
    let details = { 'username': username, 'latitude': latitude, 'longitude': longitude };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://meetinride.ddns.net:3000/updatePosition", details, options)
      .subscribe(data => {
        console.log("updatePosition: " + (data['_body']));
      });
  }

  getPositions(callback) {
    this.http.get('http://meetinride.ddns.net:3000/getPositions').map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  // Match

  addMatch(first_username, second_username) {
    let details = { 'first_username': first_username, 'second_username': second_username };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://meetinride.ddns.net:3000/addMatch", details, options)
      .subscribe(data => {
        console.log("addMatch: " + (data['_body']));
      });
  }

  getMatchsByUsername(username, callback) {
    let details = { 'username': username };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://meetinride.ddns.net:3000/getMatchsByUsername", details, options)
      .subscribe(data => {
        callback(data);
      });
  }
}
