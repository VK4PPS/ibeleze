import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string;
  senha : string;

  formGroup : FormGroup; 
  latitude: number;
  longitude: number;


  constructor(public afAuth: AngularFireAuth,
    private router : Router, 
    private formB : FormBuilder,
    private geolocation: Geolocation,
    private db: AngularFirestore, 
    private menuCtrl : MenuController, 
    private toastCtrl : ToastController) {

      this.menuCtrl.swipeEnable(false);

      this.geolocation.getCurrentPosition().then((resp) => {
        this.longitude = resp.coords.longitude;
         this.latitude = resp.coords.latitude;

    })

    }

  ngOnInit() { }


  

  login(){
    this.afAuth.auth.signInWithEmailAndPassword( 
      this.email,this.senha).then(()=>{       
       localStorage.setItem("uid",this.afAuth.auth.currentUser.uid);
       //ao logar grava a localição do usuario no firebase
       this.formGroup = this.formB.group({
        uLongitude : this.longitude,
        uLatitude : this.latitude
      });
  
         this.db.collection('uLocation').doc(localStorage.getItem("uid")).set(this.formGroup.value).then(() =>{ 
        }).catch(()=>{ 
          console.log("Erro ao cadastrar coordenadas") 
        });

        this.menuCtrl.swipeEnable(true); 
        this.router.navigate(['/home']); 

      }).catch(err=>{
       
        this.presentToast();
      })
  }



  
 async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Login inválido',
    duration: 2000
  });
  toast.present();
}

goNovoUsuario(){
  this.router.navigate(['/cadastro-usuario']);
}

goNovaSenha(){
  this.router.navigate(['/recuperar-senha']);
}

}
