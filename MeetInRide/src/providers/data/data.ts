import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../../models/user/user';

@Injectable()
export class DataProvider {
  public user: User;
  public watchPos: any;
  public mapStyle: any;
  public serverUrl: string;
  public matchs: any;

  constructor(public http: Http) {
    this.setMapStyle();
    this.serverUrl = "http://meetinride.ddns.net:3000";
  }

  updateMatchs(matchs, callback) {
    var object = [];

    matchs.forEach(function (match) {
      var json = {};
      var user = new User(match);

      json['name'] = user.getName();
      json['age'] = user.getAge().toString() + ' y.o';
      json['date'] = (new Date (match.date.replace(' ', 'T'))).toLocaleDateString();
      json['latitude'] = match.latitude;
      json['longitude'] = match.longitude;

      object.push(json);
    });

    this.matchs = object;
    callback();
  }
  
  setMapStyle() {
    this.mapStyle = [
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f7f1df"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#d0e3b4"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fbd3da"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#bde6ab"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffe15f"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#efd151"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "black"
          }
        ]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#cfb2db"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#a2daf2"
          }
        ]
      }
    ];
  }

}
