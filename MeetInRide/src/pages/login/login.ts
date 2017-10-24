import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Auth, User } from '@ionic/cloud-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    //constructor(public auth: Auth, public user: User) {}

    //let details = { 'email': 'hi@ionic.io', 'password': 'puppies123' };

    //this.auth.login('basic', details).then(... );
}