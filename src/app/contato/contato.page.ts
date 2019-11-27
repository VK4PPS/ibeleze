import { Component, OnInit } from '@angular/core';
import { Mensagens } from '../model/mensagens';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  listaMensagens : Mensagens[] = [];
  formGroup : FormGroup;

  constructor(private formB : FormBuilder,
    private db: AngularFirestore,
    private dbC: AngularFirestore,
    private toastCtrl : ToastController,
    private router : Router
    ) {
      this.formGroup = this.formB.group({
        nome : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
        assunto : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(25)]],
        email : ['',[Validators.required, Validators.email]],
        telefone : ['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
        cidade : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
        mensagem : ['',[Validators.required,Validators.minLength(20),Validators.maxLength(300)]],
      });
     }

  ngOnInit() {
    this.dbC.collection('mensagens').snapshotChanges().subscribe(response=>{ 

      this.listaMensagens = [];
      response.forEach(doc=>{ 
      
        let m = new Mensagens(); 
        m.setMensagem(doc.payload.doc.data(),doc.payload.doc.id);
        this.listaMensagens.push(m);

      },err=>{
        console.log(err);
      })

    });
  }
  enviar(){
    this.db.collection('mensagens')
      .add(this.formGroup.value).then(() =>{
        this.presentToast();
        this.router.navigate(['contato']);
      }).catch(()=>{ 
        console.log("Erro ao enviar mensagem!")
      });

  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Mensagem enviada com sucesso!',
      duration: 2000
    });
    toast.present();
  }

}

