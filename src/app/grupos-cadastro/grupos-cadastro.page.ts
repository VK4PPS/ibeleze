import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pessoas } from 'src/model/pessoas';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-grupos-cadastro',
  templateUrl: './grupos-cadastro.page.html',
  styleUrls: ['./grupos-cadastro.page.scss'],
})
export class GruposCadastroPage implements OnInit {

  listaPessoas : Pessoas[] = []; // Variável para armazenar os pessoas (Array)
  idUser : string;

  // Não esquecer de declarar ReactiveFormsModule em module.ts
  formGroup : FormGroup; // Formulário de cadastro -> Armazena todos os dados

  constructor(private formB : FormBuilder, // Inicializar o formulário (obrigatório para formGroup)
    private auth : AngularFireAuth,
    private db: AngularFirestore, // Inicia o banco de dados do firebase (Firestore)
    private toastCtrl : ToastController,
    private dbF: AngularFirestore,
    private router : Router // Redirecionamento de páginas
    ) { // Exibir Mensagem

        this.idUser = localStorage.getItem('uid');


    // Inicializa o Formulário, obrigatório no construtor
    this.formGroup = this.formB.group({
      nome : ['',Validators.required],
      horas : [0,Validators.required],
      horasPorAula : [0,Validators.required],
      idPessoa : [localStorage.getItem('uid')],
    });

  }

  



  ngOnInit() {
 
  }

  cadastrar(){
    this.db.collection('grupos') // Seleciono a coleção do firebase
      .add(this.formGroup.value).then(() =>{ // .add realiza o cadastro, os dados do formGroup
        this.presentToast();// Dados cadastrados com sucesso
         // redireciona para grupos
      }).catch(()=>{ 
        console.log("Erro ao cadastrar!") // Erro
      });
      // then -> Sucesso
      // catch -> Erro
      this.router.navigate(['grupos-lista']);
  }

  // template para toastController
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Cadastrado com sucesso',
      duration: 2000
    });
    
  }
}
