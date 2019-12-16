import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() { }
  // pega o carrinho no localStorage
  getCart(): any {
    let str = localStorage.getItem("carrinho");// pego o valor no localStore

    if (str != null) { // Existe carrinho
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  // Adiciona carrinho 
  setCart(obj: any) {
    if (obj != null) { // se o objeto for nulo
      localStorage.setItem("carrinho", JSON.stringify(obj));
    } else { // armazenar no localStorage em formato Text (String)

      localStorage.removeItem("carrinho");
    }
  }

  total() {
    let cart = this.getCart()
    let sum = 0;
    for (var i = 0; i < cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }



}
