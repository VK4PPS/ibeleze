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
 texto : string;

  constructor(
    private db: AngularFirestore,
    private router : Router
  ) {
    this.inicializar();
  }

 ngOnInit() {
    /*
    this.firestore.collection(`goals`).valueChanges().subscribe(goalList => {
      this.goalList = goalList;
      this.loadedGoalList = goalList;
    });*/
  }

  busca(){
    console.log(this.texto);
    
    this.db.collection('funcionarios').ref.orderBy('nome').startAt(this.texto).endAt(this.texto+'\uf8ff').get().then(response=>{ 
      
        response.forEach(doc=>{ 
        console.log(doc.data());
      });

  });

    
  }
/*
  initializeItems(): void {
    this.goalList = this.loadedGoalList;
  }

  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.goalList = this.goalList.filter(currentGoal => {
      if (currentGoal.goalName && searchTerm) {
        if (currentGoal.goalName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      
    });
  }*/

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
