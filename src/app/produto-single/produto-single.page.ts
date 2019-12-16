import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produtos } from 'src/model/produtos';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Carrinho } from 'src/model/carrinho';
import { Item } from 'src/model/item';
import { CarrinhoService } from 'src/services/carrinho.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-produto-single',
  templateUrl: './produto-single.page.html',
  styleUrls: ['./produto-single.page.scss'],
})
export class ProdutoSinglePage implements OnInit {
  id: string;
  formGroup: FormGroup;
  produtos: Produtos = new Produtos();
  carrinho: Carrinho = new Carrinho();
  imagem: any;
  idimg: string;

  constructor(private actRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private auth: AngularFireAuth,
    private formB: FormBuilder,
    private db: AngularFirestore,
    private router: Router,
    public firestorage: AngularFireStorage,
    private car: CarrinhoService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.carrinho.items = [];

    if (this.car.getCart() == null) {
      this.carrinho.items = [];
    } else {
      this.carrinho = this.car.getCart();
    }
  }

  ngOnInit() {
    this.db.collection("produtos")
      .doc(this.id).get().subscribe(response => {

        let ref = this.firestorage.storage.ref().child(`produtos/${this.id}.jpg`);
        ref.getDownloadURL().then(url => {
          this.produtos.id = this.id;
          this.produtos.imagem = url;
          this.produtos.nome = response.data().nome;
          this.produtos.estoque = response.data().estoque;
          this.produtos.descricao = response.data().descricao;
          this.produtos.preco = response.data().preco;
          this.produtos.categoria = response.data().categoria;
          this.downloadImage();
          
        })


      })
  }

  loadProdutos() {
    this.db.collection("produtos").doc(this.id).get().subscribe(response => {
      if (response.exists == false) {
        this.nProdutos();
      } else {
        this.produtos;
      }
    })
  }

  nProdutos() {
    let json = {
      nome: "",
      estoque: "",
      descricao: "",
      preco: "",
      categoria: "",
    }
    this.db.collection('produtos').doc(this.id).set(json).then(() => { })
  }

  addItem(p : Produtos){


    if(this.car.getCart()==null){
      this.carrinho.items = [];
    }else{
      this.carrinho = this.car.getCart();
    }
  
    let item = new Item();
    item.produto = p;
    item.quantidade = 1;
    
    this.carrinho.items.push(item);
  
    this.car.setCart(this.carrinho);
    this.presentToast();
    this.router.navigate(['cart']);
  
    
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Adicionado com sucesso',
      duration: 2000
    });
    toast.present();
  }
  
  downloadImage() {
    let ref = this.firestorage.storage.ref().child(`produtos/${this.id}.jpg`);
    ref.getDownloadURL().then(url => {
      this.imagem = url;
    }).catch(()=>{
      this.produtos.imagem = "../../assets/img/default-store.jpg";      
      })
  };


}
