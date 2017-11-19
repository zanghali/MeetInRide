import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from 'ionic-native';
import { ServerProvider } from '../../providers/server/server';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user/user';

import { UserModalPage } from '../user-modal/user-modal';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public watchPos;
  public userMarkers;
  public circle;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public connectivityService: ConnectivityServiceProvider, public server: ServerProvider, public data: DataProvider) {
    this.userMarkers = [];

    this.trackPosition();
    this.loadGoogleMaps();
  }

  trackPosition() {
    this.watchPos = Geolocation.watchPosition()
      .filter((p) => p.coords !== undefined)
      .subscribe(position => {
        this.server.updatePosition(this.data.user.getUsername(), position.coords.latitude, position.coords.longitude)

        this.server.getPositions((positions) => {
          this.clearPositions();

          positions.forEach(element => {
            let pos = new google.maps.LatLng(element.latitude, element.longitude);
            var animation;
            var icon;

            if (element.username == this.data.user.getUsername()) {
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

            if (element.username == this.data.user.getUsername())
              this.circle.setCenter(pos);
            else if ((this.circle.getBounds()).contains(pos)) {
              let that = this;

              google.maps.event.addListener(marker, 'click', function (event) {
                that.map.setCenter(pos);

                let pageDetails = that.modalCtrl.create(UserModalPage, { matchedUser: new User(element), latitude: element.latitude, longitude: element.longitude });
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
    if (this.connectivityService.isOnline()) {
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
  }
}
