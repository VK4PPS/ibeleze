import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Servico } from '../model/servico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-servico-detalhes',
  templateUrl: './servico-detalhes.page.html',
  styleUrls: ['./servico-detalhes.page.scss'],
})
export class ServicoDetalhesPage implements OnInit {

  id : string;
  servicos : Servico = new Servico();
  formGroup: FormGroup;
  

  constructor(
    private router : Router,
    private form : FormBuilder,
    private db: AngularFirestore,
    private actRoute : ActivatedRoute
    ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.formGroup = this.form.group({
      nome : ['',Validators.required],
      duracao : ['',Validators.required],
      preco : [0,Validators.required],
      desc : ['',Validators.required],
      uid: ""
    })


   }


  

  ngOnInit() {

    // Carregar os dados do servicos selecionado
    this.db.collection("servicos") // Seleciona a coleção servicos
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o servicos com base no id

      // Atribuindo os dados do response para a variável servicos
      this.servicos.nome = response.data().nome;
      this.servicos.duracao = response.data().duracao;
      this.servicos.preco = response.data().preco;
      this.servicos.desc = response.data().desc;
      this.servicos.uid =  response.data().uid

      console.log(response.data())
  
    })

  }

  delServico(){
    this.db.collection('servicos').doc(this.id).delete().then(() =>{
      console.log('Deletado com sucesso');
      this.router.navigate(["perfil-pro"]);
  }).catch(()=>{
    console.log('Erro ao deletar');
  })
  }

  atualizar(){
    this.formGroup.value.uid = this.servicos.uid
    this.db.collection('servicos').doc(this.id).update(this.formGroup.value).then(() =>{
      
  
      console.log('Atualizado com sucesso');
      this.ngOnInit()
  })
  }
  
}
