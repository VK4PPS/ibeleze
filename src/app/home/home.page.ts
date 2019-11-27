import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //public goalList: any[];
  //public loadedGoalList: any[];

 lista: string[];

  constructor(
    //private firestore: AngularFirestore,
    private router : Router
  ) {
    this.inicializar();
  }

  ngOnInit() {
   
    };

   inicializar(){
     this.lista = [
       'Tratamento Corporal',
       'Tratamento Facial',
       'Depilação',
       'Treinamento',
       'Limpeza de Pele',
       'Massagem relaxante',
       
     ];
   }

   buscar(ev: any) {

    this.inicializar();

    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.lista = this.lista.filter((item) =>{
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
   }

   goPage(x: string){
    this.router.navigate([x]);
  }
}
