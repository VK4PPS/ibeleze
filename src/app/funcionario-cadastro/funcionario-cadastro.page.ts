import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.page.html',
  styleUrls: ['./funcionario-cadastro.page.scss'],
})
export class FuncionarioCadastroPage implements OnInit {

  formGroup : FormGroup; 

  constructor(private formB : FormBuilder, 
    private db: AngularFirestore, 
    private toastCtrl : ToastController,
    private router : Router) { 

    this.formGroup = this.formB.group({
      sobrenome : ['',Validators.required],
      nome : ['',Validators.required],
      salario : ['',Validators.required],
      funcao : ['',Validators.required],
      telefone : ['',Validators.required],
      email : ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('funcionarios') 
      .add(this.formGroup.value).then(() =>{
        this.presentToast();
        this.router.navigate(['/funcionario'])
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
    this.router.navigate(['home']); 
        };

}
