import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user/user';

@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})  
export class UserModalPage {
  matchedUser: User = this.navParams.get('matchedUser');
  public name;
  public age;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public server: ServerProvider, public data: DataProvider) {
    this.name = this.matchedUser.getName();
    this.age = this.matchedUser.getAge().toString() + ' y.o';
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  match() {
    this.server.addMatch(this.data.user.getUsername(), this.matchedUser.getUsername(), () => {
      this.closeModal();
    });
  }
}
