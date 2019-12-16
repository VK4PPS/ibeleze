import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Produtos } from 'src/model/produtos';
import { Carrinho } from 'src/model/carrinho';
import { CarrinhoService } from 'src/services/carrinho.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  listaProdutos: Produtos[] = [];
  carrinho: Carrinho = new Carrinho();
  total: number;

  constructor(private db: AngularFirestore,
    private router: Router,
    private firestorage: AngularFireStorage,
    private car: CarrinhoService
  ) {

    this.carrinho.items = [];

    // Se o carrinho for nulo
    if (this.car.getCart() == null) {
      this.carrinho.items = []; // Cria um carrinho
    } else {
      this.carrinho = this.car.getCart(); // pega o carrinho criado
    }

    // Calcula o total
    this.total = this.car.total();
  }

  ngOnInit() {
    if (this.car.getCart() == null) {
      this.carrinho.items = [];
    } else {
      this.carrinho = this.car.getCart();
    }

    console.log(this.carrinho)

  }

  goPdetalhe(idValue: string) {
    this.router.navigate(['compra-status', { id: idValue }]);
  }

  goHome() {
    this.router.navigate(['home-app']);
  }

  goPerfil() {
    this.router.navigate(['perfil']);
  }

  goFeed() {
    this.router.navigate(['feedback']);
  }

  goCart() {
    this.router.navigate(['cart']);
  }

  goPedidos() {
    this.router.navigate(['pedido-status']);
  }

  removeProduto(produto: Produtos): Carrinho {
    let cart = this.car.getCart();
    // Verifica se existe o produto no carrinho

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) { // -1 -> Não existe
      cart.items.splice(position, 1);
      this.carrinho.items.splice(position, 1); // exclui o item carrinho
    }
    this.car.setCart(cart); // atualiza o carrinho
    return cart;
  }

}
