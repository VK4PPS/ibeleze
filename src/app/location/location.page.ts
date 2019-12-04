import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as mapboxgl from "mapbox-gl"
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { Perfil } from './../model/perfil';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

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
    idUser : string;
    id : string;
    imagem : any;
    

  style = 'mapbox://styles/mapbox/streets-v11';
  perfil = [];
  url: string;
                
  constructor(private geolocation: Geolocation, private db: AngularFirestore, 
    public firestorage : AngularFireStorage, 
    private auth : AngularFireAuth,
    ) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.auth.user.subscribe(resp =>{
      this.idUser = localStorage.getItem("uid");
      
    });

  }

  ngOnInit() {
    //Espera as coordenadas do usuario para iniciar o mapa
    this.geolocation.getCurrentPosition().then((resp) => {

      //recebe as coordenadas do usuario e coloca nas variaveis longitude e laitude
      this.longitude = resp.coords.longitude
      this.latitude = resp.coords.latitude

     //Insere as informações do firebase no perfil[]
      this.db.collection('perfil').snapshotChanges().subscribe(response=>{ 


        
        response.forEach(doc=>{ 
        

          this.firestorage.storage.ref().child(`perfil/${doc.payload.doc.id}.jpg`).getDownloadURL().then(url =>{
          let c = new Perfil();
          //@ts-ignore
          c.setPerfil(doc.payload.doc.data(),doc.payload.doc.id);
          
          
          this.perfil.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [c.uLongitude, c.uLatitude]
            },
            "properties": {
                "nome": c.nome,
                "servicos": c.servico,
                "sobrenome": c.sobrenome,
                "email": c.email,
                "id": doc.payload.doc.id,
                "image" : url
    
            }
        });

      });


      this.loadMapa(resp.coords.longitude,resp.coords.latitude);
        },err=>{ 
          console.log(err);
        })
  
      });

 

  }).catch((error) => {
    console.log('Error getting location', error);
  });

  }


  loadMapa(longitude,latitude){
         //Insere as informações do perfil[] nas features do mapa
         var stores = {
          "type": "FeatureCollection",
          "features": this.perfil
        };  
       //cria o mapa e centraliza nas coordendas do usuario
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 13,
          center: [longitude, latitude],
          
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
        this.servico = dadosMapa.features[0].properties.servicos;  
        this.sobrenome = dadosMapa.features[0].properties.sobrenome;  
        this.email = dadosMapa.features[0].properties.email;  
    
        document.getElementById("nome").innerHTML = this.nome+" "+this.sobrenome;
        document.getElementById("email").innerHTML = this.email;
        document.getElementById("servicos").innerHTML = this.servico;
        
        console.log(dadosMapa.features[0].properties.image);
        document.getElementById("myImg").src = dadosMapa.features[0].properties.image;
        
    
        
        
      });
    
      
    
      //Botão para localizar usuario precisamente
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        }));
  }

  
  downloadImage(){
    this.id = document.getElementById("id").innerHTML;
    let ref = this.firestorage.storage.ref().child(`perfil/${this.id}.jpg`);
    ref.getDownloadURL().then(url =>{
      this.imagem = url;
    });
  }

  
  
}