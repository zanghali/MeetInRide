import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ServerProvider } from '../providers/server/server';
import { DataProvider } from '../providers/data/data';
import { User } from '../models/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, server: ServerProvider, public data: DataProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.hide();
      splashScreen.hide();

      server.isAuthenticated((data) => {
        if (data != ''){
          this.data.user = new User(data[0]);
          this.rootPage = HomePage;
        }
        else
          this.rootPage = LoginPage;
      });
    });
  }
}
