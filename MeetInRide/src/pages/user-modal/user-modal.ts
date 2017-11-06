import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {
  username: string = this.navParams.get('username');
  matchname: string = this.navParams.get('matchname');

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public server: ServerProvider) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  match() {
    this.server.addMatch(this.username,this.matchname);
    this.closeModal();
  }
}
