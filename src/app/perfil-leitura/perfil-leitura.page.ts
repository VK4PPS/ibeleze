import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PerfilPro } from '../model/perfilPro';
import { Servico } from '../model/servico';

@Component({
  selector: 'app-perfil-leitura',
  templateUrl: './perfil-leitura.page.html',
  styleUrls: ['./perfil-leitura.page.scss'],
})
export class PerfilLeituraPage implements OnInit {


  id : string;
  perfilPro : PerfilPro = new PerfilPro();
  listaServicos: Servico[] = [];

  constructor(
    private router : Router,
    private form : FormBuilder,
    private db: AngularFirestore,
    private actRoute : ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  

  ngOnInit() {
    
    this.db.collection("perfilPro").doc(this.id).get().subscribe(response =>{
        this.perfilPro.setPerfilPro(response.data());
    })


    this.db.collection('servicos' , ref => ref.where('uid', '==', this.id)).snapshotChanges().subscribe(response=>{ 
      this.listaServicos = []; // limpando a lista
      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em servicos.
      response.forEach(doc=>{ 
        let c = new Servico(); // Cria um novo objeto servicos
        c.setServico(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em servicos
        this.listaServicos.push(c); // adiciona este servicos a lista
      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })
    });

  }

  



}
