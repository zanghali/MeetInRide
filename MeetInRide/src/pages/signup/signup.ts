import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  surname: string;
  lastname: string;
  birthdate: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public alertCtrl: AlertController, public http: Http) {
  }

  register() {
    if (this.password == this.confirmpassword) {
      let details = {
        'username': this.username,
        'email': this.email,
        'password': this.password,
        'surname': this.surname,
        'lastname': this.lastname,
        'birthdate': this.birthdate
      };

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      this.http.post("http://meetinride.ddns.net:3000/signup", details, options)
        .subscribe(data => {
          if (data['_body'] == 'true'){
            let alert = this.alertCtrl.create({
              title: "Sign Up Succeeded",
              subTitle: 'You can now log in !',
              buttons: ['OK']
            });
            alert.present();

            this.navCtrl.setRoot(LoginPage); // OK
          }
        }, error => {
          let alert = this.alertCtrl.create({
            title: "Sign Up Error",
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Sign Up Error',
        subTitle: 'Password confirmation failed',
        buttons: ['OK']
      });
      alert.present();

      this.password = "";
      this.confirmpassword = "";
    }
  }
}
