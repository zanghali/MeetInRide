import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) {
  }

  connexion() {
    let details = { 'username': this.username, 'password': this.password };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://localhost:3000/login", details, options)
      .subscribe(data => {
        console.log(data['_body'].length);

        if (data['_body'] != "[]")
          this.navCtrl.setRoot(HomePage); // OK
        else {
          let alert = this.alertCtrl.create({
            title: "Authentication Error",
            subTitle: 'User details are wrong !',
            buttons: ['OK']
          });
          alert.present();
          this.password = "";
        }
      }, error => {
            let alert = this.alertCtrl.create({
              title: "Authentication Error",
              subTitle: error,
              buttons: ['OK']
            });
            alert.present();
      });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
