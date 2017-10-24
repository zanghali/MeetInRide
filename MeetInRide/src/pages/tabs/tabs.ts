import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = LoginPage;
    tab2Root: any = RegisterPage;

  constructor() {

  }
}
