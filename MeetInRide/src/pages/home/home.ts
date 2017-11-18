import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';
import { MatchsPage } from '../matchs/matchs';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
  tab1Root: any = ProfilePage;
  tab2Root: any = MapPage;
  tab3Root: any = MatchsPage;

  constructor() {
  }
}