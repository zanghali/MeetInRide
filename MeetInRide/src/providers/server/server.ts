import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {
  private SERVER_URL = "http://meetinride.ddns.net:3000/";

  constructor(public http: Http) {
  }

  // Authentication

  isAuthenticated() {
    this.http.get(this.SERVER_URL + 'auth').map(res => res.json()).subscribe(data => {
      console.log("isAuth: " + data);
      return data;
    });
  }

  login(username, password, callback) {
    let details = { 'username': username, 'password': password };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Token', localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.SERVER_URL + "login", details, options)
      .subscribe(data => {
        callback(null, data);
      }, error => {
        callback(error, null);
      });
  }

  logout() {
    this.http.get(this.SERVER_URL + 'logout').map(res => res.json()).subscribe(data => {
      console.log("logout: " + data);
    });
  }

  signup(details, callback) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.SERVER_URL + "signup", details, options)
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

    this.http.post(this.SERVER_URL + "updatePosition", details, options)
      .subscribe(data => {
        console.log("updatePosition: " + (data['_body']));
      });
  }

  getPositions(callback) {
    this.http.get(this.SERVER_URL + 'getPositions').map(res => res.json()).subscribe(data => {
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

    this.http.post(this.SERVER_URL + "addMatch", details, options)
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

    this.http.post(this.SERVER_URL + "getMatchsByUsername", details, options)
      .subscribe(data => {
        callback(data);
      });
  }
}
