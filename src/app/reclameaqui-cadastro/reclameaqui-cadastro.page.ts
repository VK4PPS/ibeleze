import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclameaqui-cadastro',
  templateUrl: './reclameaqui-cadastro.page.html',
  styleUrls: ['./reclameaqui-cadastro.page.scss'],
})
export class ReclameaquiCadastroPage implements OnInit {

  
  formGroup : FormGroup; 

  constructor(private formB : FormBuilder, 
    private db: AngularFirestore, 
    private toastCtrl : ToastController,
    private router : Router) { 

    
    this.formGroup = this.formB.group({
      nome : ['',Validators.required],
      atuacao : ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('reclameaqui') 
      .add(this.formGroup.value).then(() =>{ 
        this.presentToast();
        this.router.navigate(['/reclameaqui'])
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