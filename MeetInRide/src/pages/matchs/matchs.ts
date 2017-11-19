import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-matchs',
  templateUrl: 'matchs.html',
})
export class MatchsPage {
  matchs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: ServerProvider, public data: DataProvider) {
    this.loadMatchs(() => {
      this.matchs = this.data.matchs;
    });
  }

  // Triggered every time we select matchs tab
  ionViewWillEnter() {
    this.loadMatchs(() => {
      this.matchs = this.data.matchs;
    });
  }

  loadMatchs(callback) {
    this.server.getMatchsByUsername(this.data.user.getUsername(), (matchs) => {
      this.data.updateMatchs(matchs.json(), () => {
        callback();
      });
    });
  }

}
