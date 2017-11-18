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
    this.server.getMatchsByUsername(data.user.getUsername(), (matchs) => {
      this.data.matchs = matchs.json();
    });

    this.matchs = this.data.matchs;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchsPage');
  }

}
