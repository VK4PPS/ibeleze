import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  formGroup :FormGroup;

  constructor(private formB : FormBuilder,
    private db: AngularFirestore,
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController) { 
      this.formGroup = this.formB.group({
        nome : ['',Validators.required],
        preco : ['',Validators.required],
  
      });
    }

  ngOnInit() {
  }

  cadastrar(){
    this.db.collection('favoritos')
    .add(this.formGroup.value).then(response =>{
      this.presentToast();
    }).catch(()=>{
      console.log("Erro ao Cadastrar")
    });
  }
  
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Cadastro com sucesso',
      duration: 2000  
    });
    toast.present();
  }
}

