import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public server: ServerProvider, public http: Http) {
  }

  connexion() {
    this.server.login(this.username, (this.password).toLowerCase(), (error, data) => {
      if (error) {
        let alert = this.alertCtrl.create({
          title: "Authentication Error",
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        if (data['_body'] != "[]")
          this.navCtrl.setRoot(HomePage, { username: this.username }); // OK
        else {
          let alert = this.alertCtrl.create({
            title: "Authentication Error",
            subTitle: 'User details are wrong !',
            buttons: ['OK']
          });
          alert.present();
          this.password = "";
        }
      }
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
