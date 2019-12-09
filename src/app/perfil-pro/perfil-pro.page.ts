import { Router } from '@angular/router';
import { PerfilPro } from './../model/perfilPro';
import { Servico } from './../model/servico';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-pro',
  templateUrl: './perfil-pro.page.html',
  styleUrls: ['./perfil-pro.page.scss'],
})
export class PerfilProPage implements OnInit {

  formGroup : FormGroup;
  formGroup2 : FormGroup;
  idUser : string;
  perfilPro : PerfilPro = new PerfilPro();
  imagem : any;
  alertData: [];
  listaServicos: Servico[] = [];

  constructor(private formBuild : FormBuilder,
    private auth : AngularFireAuth,
    private db : AngularFirestore,
    public alertController: AlertController,
    public firestorage : AngularFireStorage,
    private loadingController : LoadingController,
    private router : Router,
    private toastCtrl : ToastController) {


      this.formGroup = this.formBuild.group({
        nome: ['',Validators.required],
        sobrenome: ['',Validators.required],
        telefone: ['',Validators.required],
        email: ['',Validators.required],
        qualificacoes: ['',Validators.required],
        descricao: ['',Validators.required]
      });

      this.auth.user.subscribe(resp =>{
        this.idUser = localStorage.getItem("uid");
        this.loadPerfil();
        this.downloadImage();
      });
     }

  ngOnInit() {

    this.db.collection('servicos' , ref => ref.where('uid', '==', localStorage.getItem('uid'))).snapshotChanges().subscribe(response=>{ 
      this.listaServicos = []; // limpando a lista
      // forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja, converter um doc em servicos.
      response.forEach(doc=>{ 
        let c = new Servico(); // Cria um novo objeto servicos
        c.setServico(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em servicos
        this.listaServicos.push(c); // adiciona este servicos a lista
      },err=>{ // Em caso de erro, executa esssa linha
        console.log(err);
      })
    });

  }

  async Toastera() {
    const toast = await this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000
    });
    toast.present();
  }

  loadPerfil(){
    this.db.collection("perfilPro").doc(this.idUser).get().subscribe(response =>{
      if(response.exists==false){
        this.nPerfil();
      }else{
        this.perfilPro.setPerfilPro(response.data());
      }
    })
  }

  nPerfil(){
    let json = {
      nome: "",
      sobrenome: "",
      telefone: "",
      email: "",
      descricao: "",
      qualificacoes: ""
    }

    
  
    this.db.collection('perfilPro').doc(this.idUser).set(json).then(() =>{})
  }

  atualizar(){
    this.db.collection('perfilPro').doc(this.idUser).update(this.formGroup.value).then(() =>{
      this.loadPerfil();
      this.Toastera();
      console.log('Atualizado com sucesso');
  }).catch(()=>{
    console.log('Erro ao atualizar');
  })
  }

  voltar(){
    this.router.navigate(['home']);
        };

  enviaArquivo(event){
    this.imagem = event.srcElement.files[0];
    this.uploadStorage();
  }

  async uploadStorage(){

    let loading = await this.loadingController.create({
      message: 'Carregando!',
      duration: 2000
    });

    await loading.present();

    let urlImage = this.firestorage.storage.ref().child(`perfil/PRO${this.idUser}.jpg`);
    urlImage.put(this.imagem).then(resp =>{
      this.downloadImage();
    });
  }

downloadImage(){
  let ref = this.firestorage.storage.ref().child(`perfil/PRO${this.idUser}.jpg`);
  ref.getDownloadURL().then(url =>{
    this.imagem = url;
  });
}
goPage(x: string){
  this.router.navigate([x]);
}

servicoDetalhes(idServico: string){
  this.router.navigate(["servico-detalhes",{id: idServico}]);
}

//alerta que contem o formulario para criar serviços e que chama a função cadastrarServico()
 async alertServico() {
    const alert = await this.alertController.create({
      
      header: 'Criar Serviço',

      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome:',
        },

        {
          name: 'duracao',
          type: 'text',
          placeholder: 'Duracao:',
        },
        
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preço:',
        },
        {
          name: 'desc',
          type: 'text',
          placeholder: 'Descrição:',
        },
      
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Cadastrar',
          handler: () => {
            alert.onDidDismiss().then((alert) => {

              //passa os valores do alerta para um array que possa ser lido em outra função
              this.alertData = alert.data.values;
              //insere o UID do usuario no array para que o serviço possa ser resgatado em outras paginas atráves do mesmo
              this.alertData["uid"] = localStorage.getItem("uid");
              this.cadastrarServico()
            });
          }
        }
      ],
    }
    );

    await alert.present();

    

  }

  
  cadastrarServico(){
    this.db.collection('servicos').add(this.alertData).then(() =>{
      console.log('Cadastrado com sucesso');
  }).catch(()=>{
    console.log('Erro ao atualizar');
  })
  }

  delServico(x : string){
    this.db.collection('servicos').doc(x).delete().then(() =>{
      this.loadPerfil();
      this.Toastera();
      console.log('Deletado com sucesso');
  }).catch(()=>{
    console.log('Erro ao atualizar');
  })
  }



}
