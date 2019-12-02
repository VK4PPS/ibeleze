import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private router: Router) { }

  ngOnInit() {

//Zera as coordendas do usuario ao deslogar
    this.formGroup = this.formB.group({
      uLongitude : 0,
      uLatitude : 0
    });

       this.db.collection('uLocation').doc(localStorage.getItem("uid")).delete().then(() =>{ 
      }).catch(()=>{ 
        console.log("Erro ao remover coordenadas") 
      });


    this.afAuth.auth.signOut().then(()=>{
      localStorage.removeItem("uid");
      this.router.navigate(['/login']);
    }).catch(()=>{
      this.router.navigate(['/home']);
    })
  }

}
