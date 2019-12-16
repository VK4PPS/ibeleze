import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produtos } from 'src/model/produtos';
import { Servico } from '../model/servico';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  public listaServicos: Servico[] = [];
  public goalList: any[];
  public loadedGoalList: any[];
  
  constructor(private db: AngularFirestore,
    private router: Router, private fireStorage: AngularFireStorage) {

  }
  ngOnInit() {
    this.db.collection(`produtos`).snapshotChanges().subscribe(listaServicos => {
      this.listaServicos = [];
      this.goalList = this.listaServicos;
      this.loadedGoalList = this.listaServicos;
      listaServicos.forEach(doc => {

        let p = new Servico();
        p.setServico(doc.payload.doc.data(), doc.payload.doc.id);


        let ref = this.fireStorage.storage.ref().child(`produtos/${p.id}.jpg`);
        ref.getDownloadURL().then(url => {
          p.imagem = url;
          this.listaServicos.push(p);
        }).catch(() => {
          this.listaServicos.push(p);
          p.imagem = "../../assets/img/default-store.jpg";
        })
      }, err => {
        console.log(err);
      })
    });
    

  }
  initializeItems(): void {
    this.listaServicos = this.loadedGoalList;
  }

  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.listaServicos = this.listaServicos.filter(currentGoal => {
      if (currentGoal.nome && searchTerm) {
        if (currentGoal.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  
  goPage(idValue : string){
    this.router.navigate(['produto-single',{id : idValue}]);
  }
}
