import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from 'ionic-native';
import { ServerProvider } from '../../providers/server/server';

import { LoginPage } from '../login/login';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public connectivityService: ConnectivityServiceProvider, public server: ServerProvider) {
    this.username = navParams.get("username");

    this.trackPosition();
    this.loadGoogleMaps();
  }

  myProfile() {
    const alert = this.alertCtrl.create({
      title: 'Profile : ' + this.username,
      inputs: [
        // {
        //   name: 'username',
        //   placeholder: 'Username'
        // },
        // {
        //   name: 'password',
        //   placeholder: 'Password',
        //   type: 'password'
        // }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log Out',
          handler: data => {
            this.server.logout();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  trackPosition() {
    const subscription = Geolocation.watchPosition()
      .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.server.updatePosition(this.username, position.coords.latitude, position.coords.longitude)
      });

    // To stop notifications
    // subscription.unsubscribe();
  }

  loadGoogleMaps() {
    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      }
    }
    else {
      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }
    }
  }

  initMap() {
    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.server.getPositions((positions) => {
        positions.forEach(element => {
          console.log(element.username);

          let pos = new google.maps.LatLng(element.latitude, element.longitude);

          var marker = new google.maps.Marker({
            position: pos,
            title: element.username,
            map: this.map
          });
        });
      });
    });
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

  addConnectivityListeners() {
    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }
}
