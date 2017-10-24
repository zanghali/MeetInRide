import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';

//import { ConnectivityService } from '../providers/connectivityService';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        LoginPage,
        RegisterPage,
        HomePage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        LoginPage,
        RegisterPage,
        HomePage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
