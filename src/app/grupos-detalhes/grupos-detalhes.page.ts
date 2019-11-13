import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupos } from 'src/model/grupos';
import { PessoaGrupo } from 'src/model/pessoaGrupo';
import { ToastController, AlertController } from '@ionic/angular';
import { Perfil } from 'src/model/perfil';


@Component({
  selector: 'app-grupos-detalhes',
  templateUrl: './grupos-detalhes.page.html',
  styleUrls: ['./grupos-detalhes.page.scss'],
})
export class GruposDetalhesPage implements OnInit {
  
  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  formGroup2 : FormGroup;
  grupos : Grupos = new Grupos(); // armazena o grupos da consulta
  idGrupo : string;
  busca: string;
  
  listaPerfil : Perfil[] = [];
  listaPessoaGrupo : PessoaGrupo[] = [];


  idDocumento: string;
  idPessoa: string;
  nome: string;
  email: string;
  horas: number;
  porcentagem : string;
  minutos: number;
  minutosSoma: number;

  constructor(private actRoute : ActivatedRoute, // capturar o ID
    private formA : FormBuilder, // Inicializar o formulário
    private formB : FormBuilder, // Inicializar o formulário
    private db: AngularFirestore, // Banco de dados do firebase
    private toastCtrl : ToastController, // Exibe uma mensagem
    private router : Router, // Redirecionamento de páginas
    private alertController : AlertController) { // Exibe mensagem de cofirmação
    
    // Capturando o Id do grupos
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.minutos = 0;
    this.minutosSoma = 0;
    // Inicializando o formulário
    this.formGroup2 = this.formA.group({
      nome : ['',Validators.required],
      email : ['',Validators.required],
      horas : [0,Validators.required],
      idGrupo : ['',Validators.required],
      idDocumento : ['',Validators.required], 
    })

    this.formGroup = this.formB.group({
      nome : ['',Validators.required],
      horas : [0,Validators.required],
      horasPorAula : [0,Validators.required],
      idPessoa : [localStorage.getItem('uid')]
    });
  }

  

  ngOnInit() {
    console.log(localStorage.getItem('uid'))
    // Carregar os dados do grupos selecionado
    this.db.collection("grupos") // Seleciona a coleção grupos
    .doc(this.id).get().subscribe(response=>{ // .doc seleciona o grupos com base no id

      // Atribuindo os dados do response para a variável grupos
      this.grupos.id = this.id; 
      this.grupos.nome = response.data().nome;
      this.grupos.horas = response.data().horas;
      this.grupos.horasPorAula = response.data().horasPorAula;
       


      this.getPessoaGrupo()
  
    })
    
  }
 
  goPage(idValue : string){
    // Redirecionando para GruposDetalhes
    // enviando o id do grupos (idValue)
    this.router.navigate(['perfil-detalhes',{id : idValue}]);
  } 
  

  atualizar(){
    // Atualiza dos dados do grupos
    this.db.collection('grupos') // seleciona a coleção grupos
      .doc(this.grupos.id) // Seleciona pelo ID do grupos
        .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
            this.router.navigate(['grupos-lista']); // redireciona para grupos
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
  }

  excluir(){
    this.db.collection('grupos') // seleciona a coleção grupos
      .doc(this.grupos.id) // Seleciona pelo ID do grupos
        .delete().then(()=>{ // Executa a exclusão
          this.presentToast();
          this.router.navigate(['grupos-lista']);
    })
    
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Executado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  

  buscar(){
    console.log(this.busca)
    this.db.collection('perfil' , ref => ref.where('email', '==', this.busca)).snapshotChanges().subscribe(response=>{ 
      console.log(this.busca)
      this.listaPerfil = []; // limpando a lista
      // response retona um objeto do firebase, precisamos converter em
      // um objeto grupos

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em grupos.
      response.forEach(doc=>{ 
      
        let b = new Perfil(); // Cria um novo objeto grupos
        b.setPerfil(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em grupos

        this.listaPerfil.push(b); // adiciona este grupos a lista
      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })
  })
  console.log(this.listaPerfil)
  }

  getPessoaGrupo(){
    this.db.collection('pessoaGrupo' , ref => ref.where('idGrupo', '==', this.grupos.id)).snapshotChanges().subscribe(response=>{ 
      this.listaPessoaGrupo = []; // limpando a lista
      // response retona um objeto do firebase, precisamos converter em
      // um objeto grupos

      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em grupos.
      response.forEach(doc=>{ 
      
        let c = new PessoaGrupo(); // Cria um novo objeto grupos
        c.setPessoaGrupo(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em grupos

        this.listaPessoaGrupo.push(c); // adiciona este grupos a lista
      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })
  })
  this.router.navigate(['grupos-detalhes']);
  }


  presente() {
    this.formGroup2 = this.formA.group({
      nome : this.nome,
      email : this.email,
      horas: this.grupos.horasPorAula + this.horas,
      idGrupo : [this.grupos.id],
      idPessoa : this.idPessoa, 
    })
    // Atualiza dos dados do grupos
    this.db.collection('pessoaGrupo') // seleciona a coleção grupos
      .doc(this.idDocumento) // Seleciona pelo ID do grupos
        .set(this.formGroup2.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
            this.router.navigate(['grupos']); // redireciona para grupos
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
 
  }

  falta() {
    this.formGroup2 = this.formA.group({
      nome : this.nome,
      email : this.email,
      horas: -this.grupos.horasPorAula + this.horas,
      idGrupo : [this.grupos.id],
      idPessoa : this.idPessoa, 
    })
    // Atualiza dos dados do grupos
    this.db.collection('pessoaGrupo') // seleciona a coleção grupos
      .doc(this.idDocumento) // Seleciona pelo ID do grupos
        .set(this.formGroup2.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
            this.router.navigate(['grupos']); // redireciona para grupos
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
 
  }

 atraso() {
    this.formGroup2 = this.formA.group({
      nome : this.nome,
      email : this.email,
      horas: this.horas - this.minutosSoma,
      idGrupo : [this.grupos.id],
      idPessoa : this.idPessoa, 
    })
    // Atualiza dos dados do grupos
    this.db.collection('pessoaGrupo') // seleciona a coleção grupos
      .doc(this.idDocumento) // Seleciona pelo ID do grupos
        .set(this.formGroup2.value) // Envia o formGroup com os dados selecionados
          .then(() =>{
            this.presentToast(); // Dados atualizados
            this.router.navigate(['grupos']); // redireciona para grupos
          }).catch(()=>{
            console.log('Erro ao Atualizar'); // Erro ao atualizar
          })
 
  }


  excluirPessoaGrupo(){
    this.db.collection('pessoaGrupo') // seleciona a coleção grupos
      .doc(this.idDocumento) // Seleciona pelo ID do grupos
        .delete().then(()=>{ // Executa a exclusão

      this.router.navigate(['grupos-detalhes']); // redireciona para grupos
    })
  }

atraso1(){

this.minutosSoma = this.minutosSoma+1;
}

atraso3(){

  this.minutosSoma = this.minutosSoma+0.5;
  }

  cadastrar(){
// (Nome : string, Id: string) Não entendi como isso funciona, descobrir mais tarde
    this.formGroup2 = this.formA.group({
      nome : this.nome,
      email : this.email,
      horas: 0,
      idGrupo : [this.grupos.id],
      idPessoa : localStorage.getItem('uid'), 

    })

    this.db.collection('pessoaGrupo') // Seleciono a coleção do firebase
    .add(this.formGroup2.value).then(() =>{ // .add realiza o cadastro, os dados do formGroup
      this.presentToast();// Dados cadastrados com sucesso
      this.router.navigate(['grupos-lista']); // redireciona para grupos
    }).catch(()=>{ 
      console.log("Erro ao cadastrar!") // Erro
    });
   



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

  async confirm2() {
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
            this.excluirPessoaGrupo();
          }
        }
      ]
    });

    await alert.present();
  }
}

