import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss'],
})
export class LogoffPage implements OnInit {

  formGroup : FormGroup; 


  constructor(public afAuth: AngularFireAuth,
    private formB : FormBuilder,
    private db: AngularFirestore, 
    private router: Router,
    private toastCtrl : ToastController) { }

  ngOnInit() {

    console.log(localStorage.getItem("uid"))

//Zera as coordendas do usuario ao deslogar
    this.formGroup = this.formB.group({
      uLongitude : 0,
      uLatitude : 0
    });

       this.db.collection('perfil').doc(localStorage.getItem("uid")).update(this.formGroup.value).then(() =>{ 
      }).catch(()=>{ 
        console.log("Erro ao remover coordenadas") 
      });


    this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem("uid");
      this.router.navigate(['/login']);
      this.Toastera();
    }).catch(()=>{
      this.router.navigate(['/home']);
    })
  }

  async Toastera() {
    const toast = await this.toastCtrl.create({
      message: 'Deslogado com sucesso',
      duration: 4000
    });
    toast.present();
  }

}
