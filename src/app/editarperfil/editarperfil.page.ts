import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Perfil } from './../model/perfil';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  formGroup : FormGroup;
  idUser : string;
  perfil : Perfil = new Perfil();
  imagem : any;

  constructor(private formBuild : FormBuilder,
    private auth : AngularFireAuth,
    private db : AngularFirestore,
    public firestorage : AngularFireStorage,
    private loadingController : LoadingController,
    private router : Router,
    public alertController: AlertController) {

      this.formGroup = this.formBuild.group({
        nome: ['',Validators.required],
        sobrenome: ['',Validators.required],
        telefone: ['',Validators.required],
        email: ['',Validators.required]
      });

      this.auth.user.subscribe(resp =>{
        this.idUser = resp.uid;
        this.loadPerfil();
        this.downloadImage();
      });
     }

  ngOnInit() {
  }

  loadPerfil(){
    this.db.collection("perfil").doc(this.idUser).get().subscribe(response =>{
      if(response.exists==false){
        this.nPerfil();
      }else{
        this.perfil.setPerfil(response.data());
      }
    })
  }

  nPerfil(){
    let json = {
      nome: "",
      sobrenome: "",
      telefone: "",
      email: ""
    }
    this.db.collection('perfil').doc(this.idUser).set(json).then(() =>{})
  }

  atualizar(){
    this.db.collection('perfil').doc(this.idUser).set(this.formGroup.value).then(() =>
    {console.log('Atualizado com sucesso');
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

    let urlImage = this.firestorage.storage.ref().child(`perfil/${this.idUser}.jpg`);
    urlImage.put(this.imagem).then(resp =>{
      this.downloadImage();
    });
  }

downloadImage(){
  let ref = this.firestorage.storage.ref().child(`perfil/${this.idUser}.jpg`);
  ref.getDownloadURL().then(url =>{
    this.imagem = url;
  });
}
goPage(x: string){
  this.router.navigate([x]);
}




async presentAlert() {
  const alert = await this.alertController.create({
    header: '{{perfil.imagem}}',
    subHeader: 'Subtitle',
    message: 'This is an alert message.',
    buttons: ['OK']
  });

  await alert.present();
}

}
