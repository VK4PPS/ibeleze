import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-cadastro',
  templateUrl: './feedback-cadastro.page.html',
  styleUrls: ['./feedback-cadastro.page.scss'],
})
export class FeedbackCadastroPage implements OnInit {

  
  formGroup : FormGroup; 

  constructor(private formB : FormBuilder, 
    private db: AngularFirestore, 
    private toastCtrl : ToastController,
    private router : Router) { 

    
    this.formGroup = this.formB.group({
      nome : ['',Validators.required],
      atuacao : ['',Validators.required],
      satisfacao : ['',Validators.required],
      sugestao : ['',Validators.required],
      email : ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('feedbacks') 
      .add(this.formGroup.value).then(() =>{ 
        this.presentToast();
        this.router.navigate(['/feedback'])
      }).catch(()=>{ 
        console.log("Erro ao cadastrar!") 
      });
     
  }

  
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Cadastrado com sucesso',
      duration: 2000
        });
    toast.present();
  }

  voltar(){
    this.router.navigate(['feedback']); 
        };

}
