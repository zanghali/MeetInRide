import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from 'ionic-native';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';

import { UserModalPage } from '../user-modal/user-modal';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public username;
  public watchPos;
  public userMarkers;
  public circle;

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public connectivityService: ConnectivityServiceProvider, public server: ServerProvider, public data: DataProvider) {
    this.username = this.data.username;
    this.userMarkers = [];

    this.data.username = this.username;

    this.trackPosition();
    this.loadGoogleMaps();
  }

  trackPosition() {
    this.watchPos = Geolocation.watchPosition()
      .filter((p) => p.coords !== undefined)
      .subscribe(position => {
        this.server.updatePosition(this.username, position.coords.latitude, position.coords.longitude)

        this.server.getPositions((positions) => {
          this.clearPositions();

          positions.forEach(element => {
            let pos = new google.maps.LatLng(element.latitude, element.longitude);
            var animation;
            var icon;

            if (element.username == this.username) {
              animation = google.maps.Animation.BOUNCE;
              icon = 'assets/imgs/male.png';
            }
            else {
              animation = null;
              icon = 'assets/imgs/' + (((this.circle.getBounds()).contains(pos)) ? 'female' : 'others') + '.png';
            }

            var marker = new google.maps.Marker({
              position: pos,
              title: element.username,
              animation: animation,
              icon: icon,
              map: this.map
            });
            this.userMarkers.push(marker);

            if (element.username == this.username)
              this.circle.setCenter(pos);
            else {
              let that = this;

              google.maps.event.addListener(marker, 'click', function (event) {
                that.map.setCenter(pos);

                let pageDetails = that.modalCtrl.create(UserModalPage, { username: that.username, matchname: element.username });
                pageDetails.present();
              });
            }
          });
        });
      });
    this.data.watchPos = this.watchPos;
  }

  clearPositions() {
    for (var i = 0; i < this.userMarkers.length; i++) {
      this.userMarkers[i].setMap(null);
    }
    this.userMarkers = [];
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
      var style = this.data.mapStyle;
      
      let mapOptions = {
        center: latLng,
        zoom: 16,
        styles: style,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.circle = new google.maps.Circle({
        radius: 100,
        center: latLng,
        map: this.map,
        fillColor: '#D467A1',
        fillOpacity: 0.1,
        strokeColor: '#5183B8',
        strokeOpacity: 0.1
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
