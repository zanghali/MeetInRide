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
  public username;
  public watchPos;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public server: ServerProvider, public data: DataProvider) {
    this.username = this.data.username;
    this.watchPos = this.data.watchPos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    this.watchPos.unsubscribe();
    this.server.logout();
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage);
  }
}

