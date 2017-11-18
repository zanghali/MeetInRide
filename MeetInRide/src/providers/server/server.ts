import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServerProvider {
  private SERVER_URL = "http://meetinride.ddns.net:3000/";

  constructor(public http: Http) {
  }

  prepareHeaders(withToken) {
    let headers = new Headers();
  
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');  

    if (withToken)
      headers.append("Authorization", localStorage.getItem("token"));

    return new RequestOptions({ headers: headers });
  }

  // Authentication

  isAuthenticated(callback) {
    let options = this.prepareHeaders(true);

    this.http.get(this.SERVER_URL + 'auth', options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  login(username, password, callback) {
    let details = { 'username': username, 'password': password };
    let options = this.prepareHeaders(true);

    this.http.post(this.SERVER_URL + "login", details, options)
      .subscribe(data => {
        callback(null, data);
      }, error => {
        callback(error, null);
      });
  }

  logout(username) {
    let details = { 'username': username };
    let options = this.prepareHeaders(true);

    this.http.post(this.SERVER_URL + "logout", details, options)
      .subscribe(data => {
        console.log("logout: " + data);
      });
  }

  signup(details, callback) {
    let options = this.prepareHeaders(false);

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
    let options = this.prepareHeaders(true);

    this.http.post(this.SERVER_URL + "updatePosition", details, options)
      .subscribe(data => {
        console.log("updatePosition: " + (data['_body']));
      });
  }

  getPositions(callback) {
    let options = this.prepareHeaders(true);

    this.http.get(this.SERVER_URL + 'getPositions', options).map(res => res.json()).subscribe(data => {
      callback(data);
    });
  }

  // Match

  addMatch(first_username, second_username) {
    let details = { 'first_username': first_username, 'second_username': second_username };
    let options = this.prepareHeaders(true);

    this.http.post(this.SERVER_URL + "addMatch", details, options)
      .subscribe(data => {
        console.log("addMatch: " + (data['_body']));
      });
  }

  getMatchsByUsername(username, callback) {
    let details = { 'username': username };
    let options = this.prepareHeaders(true);

    this.http.post(this.SERVER_URL + "getMatchsByUsername", details, options)
      .subscribe(data => {
        callback(data);
      });
  }
}
