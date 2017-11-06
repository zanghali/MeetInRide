import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchsPage } from './matchs';

@NgModule({
  declarations: [
    MatchsPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchsPage),
  ],
})
export class MatchsPageModule {}
