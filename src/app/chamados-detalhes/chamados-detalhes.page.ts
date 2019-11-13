import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chamados } from 'src/model/chamados';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-chamados-detalhes',
  templateUrl: './chamados-detalhes.page.html',
  styleUrls: ['./chamados-detalhes.page.scss'],
})
export class ChamadosDetalhesPage implements OnInit {
  
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  chamados : Chamados = new Chamados(); // armazena o chamados da consulta

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    // Capturando o Id do chamados
    this.id = this.actRoute.snapshot.paramMap.get('id');

    // Inicializando o formulário
    this.formGroup = this.formB.group({
      data : [],
      idFuncionario : [],
      nomeEquipamento : [],
      defeito : [],
      
      
    })
  }
  

  ngOnInit() {
    // Carregar os dados do chamados selecionado
    this.db.collection("chamados") // Seleciona a coleção chamados
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o chamados com base no id

      // Atribuindo os dados do response para a variável chamados
      this.chamados.id = this.id; 
      this.chamados.data = response.data().data;
      this.chamados.idFuncionario = response.data().idFuncionario;
      this.chamados.nomeEquipamento = response.data().nomeEquipamento;
      this.chamados.defeito = response.data().defeito;

      
    })
  }

  atualizar(){
    // Atualiza dos dados do chamados
    this.db.collection('chamados') // seleciona a coleção chamados
      .doc(this.chamados.id) // Seleciona pelo ID do chamados
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
            this.router.navigate(['chamados']); // redireciona para chamados
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('chamados') // seleciona a coleção chamados
      .doc(this.chamados.id) // Seleciona pelo ID do chamados
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['chamados']); // redireciona para chamados
    })
  }

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

