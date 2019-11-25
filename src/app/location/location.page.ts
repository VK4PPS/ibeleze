import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as mapboxgl from "mapbox-gl"
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  map: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/streets-v11';
                
  constructor(private geolocation: Geolocation) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {


    

    this.geolocation.getCurrentPosition().then((resp) => {

    
      console.log(resp.coords.longitude, resp.coords.latitude);


      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [resp.coords.longitude, resp.coords.latitude],
    });




    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      }));


  }).catch((error) => {
    console.log('Error getting location', error);
  });

 
  }

 

}