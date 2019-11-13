import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Grupos } from 'src/model/grupos';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-grupos-lista',
  templateUrl: 'grupos-lista.page.html',
  styleUrls: ['grupos-lista.page.scss'],
})

export class GruposPage implements OnInit {
  
  listaGrupos : Grupos[] = []; // Variável para armazenar os grupos (Array)

  constructor(private db: AngularFirestore, // Módulo de banco de dados
    private router : Router,
    private auth : AngularFireAuth,) {    

      
  }
  
  ngOnInit() {
    console.log(localStorage.getItem('uid'));
     
    // Solicita os dados da coleção grupos no Firebase


      this.db.collection('grupos' , ref => ref.where('idPessoa', '==', localStorage.getItem('uid'))).snapshotChanges().subscribe(response=>{ 
    


      this.listaGrupos = []; // limpando a lista
      // response retona um objeto do firebase, precisamos converter em
      // um objeto grupos

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em grupos.
      response.forEach(doc=>{ 
      
        let c = new Grupos(); // Cria um novo objeto grupos
        c.setGrupos(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em grupos

        this.listaGrupos.push(c); // adiciona este grupos a lista

      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })

    });
  }


  goPage(idValue : string){
    // Redirecionando para GruposDetalhes
    // enviando o id do grupos (idValue)
    this.router.navigate(['grupos-detalhes',{id : idValue}]);

  } 

  
}
