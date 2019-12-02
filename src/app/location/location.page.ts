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
    nome: string;
    servicos: string;
    dadosMapa: any;
    
  style = 'mapbox://styles/mapbox/streets-v11';
  uLocation = [];
                
  constructor(private geolocation: Geolocation, private db: AngularFirestore,) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    //Espera as coordenadas do usuario para iniciar o mapa
    this.geolocation.getCurrentPosition().then((resp) => {

      //recebe as coordenadas do usuario e coloca nas variaveis longitude e laitude
      this.longitude = resp.coords.longitude
      this.latitude = resp.coords.latitude

     //Insere as informações do firebase no uLocation[]
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
                "nome": c.nome,
                "servicos": c.servicos
            }
        });

        },err=>{ 
          console.log(err);
        })
  
      });

      //Insere as informações do uLocation[] nas features do mapa
    var stores = {
      "type": "FeatureCollection",
      "features": this.uLocation
    };  
    console.log(stores)
    
   //cria o mapa e centraliza nas coordendas do usuario
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [resp.coords.longitude, resp.coords.latitude],
      
      //espera o mapa para carregar as lojas ou marcações
  }).on('load',function(resp){


    //Define imagem que sera usada como marcador
      resp.target.loadImage('../../assets/gpsPink.png', 
      function(error, image) {

        resp.target.addImage('marcador', image);

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
            "icon-image": "marcador",
            "icon-size": 0.05
          }
        })
  }
  
  )
  });

  //ao clickar no marcador pega as informações do firebase inseridas no mapa
  this.map.on('click', 'locations', function (dadosMapa) {
    this.nome = dadosMapa.features[0].properties.nome;
    this.servicos = dadosMapa.features[0].properties.servicos;  
    console.log(this.nome, this.servicos);
    document.getElementById("nome").innerHTML = this.nome;
    document.getElementById("servicos").innerHTML = this.servicos;
  });

  

  //Botão para localizar usuario precisamente
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