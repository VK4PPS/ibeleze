import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as mapboxgl from "mapbox-gl"
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ULocation } from 'src/model/uLocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
    map: mapboxgl.Map;
    longitude : number;
    latitude : number;

  style = 'mapbox://styles/mapbox/streets-v11';
  uLocation = [];
                
  constructor(private geolocation: Geolocation, private db: AngularFirestore,) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {

    //Espera as coordenadas do usaurio para iniciar o mapa
    this.geolocation.getCurrentPosition().then((resp) => {


      console.log(resp.coords.longitude, resp.coords.latitude);

      this.longitude = resp.coords.longitude
      this.latitude = resp.coords.latitude


      this.db.collection('uLocation').snapshotChanges().subscribe(response=>{ 


        
        response.forEach(doc=>{ 
        
          let c = new ULocation();
          c.setLocation(doc.payload.doc.data(),doc.payload.doc.id);
          
          this.uLocation.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [c.uLongitude, c.uLatitude]
            },
            "properties": {
                "phoneFormatted": "(202) 234-7336",
            "phone": "2022347336",
            "address": "1471 P St NW",
            "city": "Washington DC",
            "country": "United States",
            "crossStreet": "at 15th St NW",
            "postalCode": "20005",
            "state": "D.C."
            }
        });

        },err=>{ 
          console.log(err);
        })
  
      });

    var stores = {
      "type": "FeatureCollection",
      "features": this.uLocation
    };  
    console.log(stores)
    

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [resp.coords.longitude, resp.coords.latitude],
      
      //espera o mapa para carregar as lojas ou marcações
  }).on('load',function(resp){


    
      resp.target.loadImage('../../assets/gpsPink.png', 
      function(error, image) {

        resp.target.addImage('cat', image);

        //@ts-ignore
        resp.target.addLayer({
          id: 'locations',
          type: 'symbol',
          // Add a GeoJSON source containing place coordinates and information.
          source: {
            type: "geojson",
            
            data: stores
          },
          layout: {
            "icon-image": "cat",
            "icon-size": 0.05
          }
        })
  }
  
  )
  });

  this.map.on('click', 'locations', function (e) {
    console.log("popup aparece")
    var country = e.features[0].properties.country;
     
    new mapboxgl.Popup()
  console.log(country)
  });

  //Botão para localizar usuario
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