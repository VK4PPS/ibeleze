import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { Chamados } from 'src/model/chamados';

@Component({
  selector: 'app-chamados',
  templateUrl: 'chamados.page.html',
  styleUrls: ['chamados.page.scss'],
})

export class ChamadosPage implements OnInit {
  
  listaChamados : Chamados[] = []; // Variável para armazenar os chamados (Array)

  constructor(private db: AngularFirestore, // Módulo de banco de dados
    private router : Router) {
      
    
    
  }

  ngOnInit() {
     
    // Solicita os dados da coleção chamados no Firebase
    this.db.collection('chamados').snapshotChanges().subscribe(response=>{ 

      this.listaChamados = []; // limpando a lista

      // response retona um objeto do firebase, precisamos converter em
      // um objeto chamados

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em chamados.
      response.forEach(doc=>{ 
      
        let c = new Chamados(); // Cria um novo objeto chamados
        c.setChamados(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em chamados

        this.listaChamados.push(c); // adiciona este chamados a lista

      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })

    });
  }


  goPage(idValue : string){
    // Redirecionando para ChamadosDetalhes
    // enviando o id do chamados (idValue)
    this.router.navigate(['chamados-detalhes',{id : idValue}]);
  } 

}
