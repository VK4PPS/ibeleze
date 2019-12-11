import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Servico } from '../model/servico';

@Component({
  selector: 'app-servico-detalhes',
  templateUrl: './servico-detalhes.page.html',
  styleUrls: ['./servico-detalhes.page.scss'],
})
export class ServicoDetalhesPage implements OnInit {

  id : string;
  servicos : Servico = new Servico();
  

  constructor(
    private db: AngularFirestore,
    private actRoute : ActivatedRoute
    ) {

    this.id = this.actRoute.snapshot.paramMap.get('id');

   }


  

  ngOnInit() {

    console.log(localStorage.getItem('uid'))
    // Carregar os dados do servicos selecionado
    this.db.collection("servicos") // Seleciona a coleção servicos
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o servicos com base no id

      // Atribuindo os dados do response para a variável servicos
      this.servicos.id = this.id; 
      this.servicos.nome = response.data().nome;
      this.servicos.duracao = response.data().duracao;
      this.servicos.preco = response.data().preco;
      this.servicos.desc = response.data().desc;
       
      console.log(this.servicos)
  
    })

  }

}
