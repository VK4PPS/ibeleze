import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as mapboxgl from "mapbox-gl"
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { PerfilPro } from './../model/perfilPro';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
    imagem : any;

  style = 'mapbox://styles/mapbox/streets-v11';
  perfil = [];
  url: string;
  idpro: string;
                
  constructor(private geolocation: Geolocation, private db: AngularFirestore, 
    public firestorage : AngularFireStorage, 
    private auth : AngularFireAuth,
    private router : Router,
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
      this.db.collection('perfilPro').snapshotChanges().subscribe(response=>{ 


        
        response.forEach(doc=>{ 
        

          this.firestorage.storage.ref().child(`perfil/PRO${doc.payload.doc.id}.jpg`).getDownloadURL().then(url =>{
          let c = new PerfilPro();
          //@ts-ignore
          c.setPerfilPro(doc.payload.doc.data(),doc.payload.doc.id);
          
          
          this.perfil.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [c.uLongitude, c.uLatitude]
            },
            "properties": {
                "nome": c.nome,
                "sobrenome": c.sobrenome,
                "email": c.email,
                "qual": c.qualificacoes,
                "desc": c.descricao,
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
        this.sobrenome = dadosMapa.features[0].properties.sobrenome;  
        this.email = dadosMapa.features[0].properties.email;  
        this.qual = dadosMapa.features[0].properties.qual;  
        this.desc = dadosMapa.features[0].properties.desc;  

        console.log(dadosMapa.features[0].properties)
    
        document.getElementById("nome").innerHTML = this.nome+" "+this.sobrenome;
        document.getElementById("email").innerHTML = this.email;
        document.getElementById("qual").innerHTML = this.qual;
        document.getElementById("desc").innerHTML = this.desc;
        
        //@ts-ignore
        document.getElementById("myImg").src = dadosMapa.features[0].properties.image;


        
        document.getElementById("id").innerHTML = dadosMapa.features[0].properties.id;
        
      });
    
      
    
      //Botão para localizar usuario precisamente
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        }));
  }

  perfilLeitura(){
    this.idpro = document.getElementById("id").innerHTML
    this.router.navigate(["perfil-leitura",{id: this.idpro}]);
  }

}