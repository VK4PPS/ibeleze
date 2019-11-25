import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Perfil } from 'src/model/perfil';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  
  id : string; 
  formGroup : FormGroup; 
  perfil : Perfil = new Perfil(); 

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    this.id = this.actRoute.snapshot.paramMap.get('id');


    this.formGroup = this.formB.group({
      pagamento : [],
      favoritos: [],  
      endereco: [], 
      carteira: [], 
      cupons: [], 
      notificacoes: [], 
    })
  }
  

  ngOnInit() {

    

    console.log(localStorage.getItem("uid"))
   
    this.db.collection("editar-perfil") 
    .doc(localStorage.getItem("uid")).get().subscribe(response=>{ 

      this.perfil.id = localStorage.getItem("uid"); 
      this.perfil.pagamento = response.data().pagamento;
      this.perfil.favoritos = response.data().favoritos;
      this.perfil.endereco = response.data().endereco;
      this.perfil.carteira = response.data().carteira;
      this.perfil.cupons = response.data().cupons;
      this.perfil.notificacoes = response.data().notificacoes;
      
    })

  }
 
  goPage(idValue : string){
    this.router.navigate(['editar-perfil',{id : idValue}]);
  } 

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

}

