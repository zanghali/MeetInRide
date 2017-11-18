import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {
  username: string = this.navParams.get('username');
  matchname: string = this.navParams.get('matchname');

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public server: ServerProvider, public data: DataProvider) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  match() {
    this.server.addMatch(this.username, this.matchname, () => {
      this.server.getMatchsByUsername(this.data.user.getUsername(), (matchs) => {
        this.data.matchs = matchs.json();
      });
    });
    this.closeModal();
  }
}
