import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reclameaqui } from '../model/reclameaqui';
@Component({
  selector: 'app-reclameaqui',
  templateUrl: './reclameaqui.page.html',
  styleUrls: ['./reclameaqui.page.scss'],
})
export class ReclameaquiPage implements OnInit {
  listareclameaqui : Reclameaqui[] = []; 

  constructor(private db: AngularFirestore, 
    private router : Router) {
    }

  ngOnInit() {
     
    
    this.db.collection('reclameaqui').snapshotChanges().subscribe(response=>{ 

      this.listareclameaqui = []; 

      
      response.forEach(doc=>{ 
      
        let c = new Reclameaqui(); 
        c.setreclameaqui(doc.payload.doc.data(),doc.payload.doc.id); 

        this.listareclameaqui.push(c);

      },err=>{ 
        console.log(err);
      })

    });
  }
  
  voltar(){
    this.router.navigate(['home']); 
        };

  goPage(idValue : string){
    
    this.router.navigate(['reclameaqui',{id : idValue}]);
  } 

}
