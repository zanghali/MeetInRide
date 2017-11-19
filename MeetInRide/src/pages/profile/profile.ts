import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public name;
  public age;
  
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public server: ServerProvider, public data: DataProvider) {
    this.name = data.user.getName();
    this.age = data.user.getAge().toString() + ' y.o';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    this.data.watchPos.unsubscribe();
    this.server.logout(this.data.user.getUsername());
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage);
  }
}

