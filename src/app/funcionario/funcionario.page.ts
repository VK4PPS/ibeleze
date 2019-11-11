import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage implements OnInit {

  listaFuncionario : Funcionario[] = []; 

  constructor(private db: AngularFirestore, 
    private router : Router) {
    }

  ngOnInit() {    
    
    this.db.collection('funcionarios').snapshotChanges().subscribe(response=>{ 

      this.listaFuncionario = []; 
      
      response.forEach(doc=>{ 
      
        let c = new Funcionario();
        c.setFuncionario(doc.payload.doc.data(),doc.payload.doc.id);

        this.listaFuncionario.push(c); 

      },err=>{ 
        console.log(err);
      })

    });
  }

  goPage(idValue : string){
  
    this.router.navigate(['funcionario-detalhes',{id : idValue}]);
  } 



  
}