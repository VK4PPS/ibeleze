import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Perfil } from 'src/model/perfil';
import { ToastController, AlertController } from '@ionic/angular';
import { Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-perfil-detalhes',
  templateUrl: './perfil-detalhes.page.html',
  styleUrls: ['./perfil-detalhes.page.scss'],
})
export class PerfilDetalhesPage implements OnInit {
  
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  perfil : Perfil = new Perfil(); // armazena o perfil da consulta

  

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    // Capturando o Id do perfil
    this.id = this.actRoute.snapshot.paramMap.get('id');

    // Inicializando o formulário
    this.formGroup = this.formB.group({
      nome : [],
      email: [],  
    })
  }
  

  ngOnInit() {
    console.log(this.id)
    // Carregar os dados do perfil selecionado
    this.db.collection("perfil") // Seleciona a coleção perfil
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o perfil com base no id

      // Atribuindo os dados do response para a variável perfil
      this.perfil.id = this.id; 
      this.perfil.nome = response.data().nome;
      this.perfil.email = response.data().email;
      
    })

    
  }
 
  goPage(idValue : string){
    // Redirecionando para PerfilDetalhes
    // enviando o id do perfil (idValue)
    this.router.navigate(['perfil-detalhes',{id : idValue}]);
  } 

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

}

