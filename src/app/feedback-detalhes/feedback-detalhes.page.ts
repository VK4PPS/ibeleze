import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Feedback } from '../model/feedback';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-detalhes',
  templateUrl: './feedback-detalhes.page.html',
  styleUrls: ['./feedback-detalhes.page.scss'],
})
export class FeedbackDetalhesPage implements OnInit {
  
  id : string; 
  formGroup : FormGroup; 
  feedback : Feedback = new Feedback(); 

  constructor(private actRoute : ActivatedRoute, 
    private formB : FormBuilder,
    private db: AngularFirestore, 
    private toastCtrl : ToastController,
    private router : Router, 
    private alertController : AlertController,
    ) { 
    
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.formGroup = this.formB.group({
      id : [],
      nome : [],
      atuacao : [],
      satisfacao : [],
      sugestao :[],
      email :[],
      nota :[],
    })
  }

  ngOnInit() {
    
    this.db.collection("feedbacks")
    .doc(this.id).get().subscribe(response=>{

      this.feedback.id = this.id; 
      this.feedback.atuacao = response.data().atuacao;
      this.feedback.nome = response.data().nome;
      this.feedback.satisfacao = response.data().satisfacao;
      this.feedback.email = response.data().email;
      this.feedback.sugestao = response.data().sugestao;
      this.feedback.nota = response.data().nota;
     })
  }

  atualizar(){
    
    this.db.collection('feedbacks') 
      .doc(this.feedback.id) 
        .set(this.formGroup.value) 
          .then(() =>{
            this.presentToast();
            this.router.navigate(['feedback']);
          }).catch(()=>{
            console.log('Erro ao Atualizar'); 
          })
  }

  excluir(){
    this.db.collection('feedbacks') 
      .doc(this.feedback.id) 
        .delete().then(()=>{ 

      this.router.navigate(['feedback']);
    })
  }

  voltar(){
this.router.navigate(['feedback']);
    };

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir();
            
          }
        }
      ]
    });

    await alert.present();
  }


  
}

