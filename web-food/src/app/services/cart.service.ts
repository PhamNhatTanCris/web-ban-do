import { Injectable } from '@angular/core';
import { Cart } from '../shared/model/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { food } from '../shared/model/food';
import { CartItem } from '../shared/model/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(foods: food): void{
    let cartItem = this.cart.items.find(item => item.foods.id == foods.id)
    if(cartItem){
      return;
    }
    this.cart.items.push(new CartItem(foods));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.foods.id != foodId );
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: number, quantity: number){
    let cartItem = this.cart.items.find(item => item.foods.id === foodId)
    if(!cartItem){
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.foods.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cardJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cardJson);
    this.cartSubject.next(this.cart);
  }


  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
