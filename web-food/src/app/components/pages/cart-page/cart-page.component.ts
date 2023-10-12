import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/model/cart';
import { CartItem } from 'src/app/shared/model/cartItem';
import { food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cart!: Cart;
  constructor(private _cartService: CartService){
    this._cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    })
  }
  ngOnInit(): void {

  }

  removeFromCart(cartItem: CartItem){
    this._cartService.removeFromCart(cartItem.foods.id);
  }

  changeQuantity(cartItem: CartItem, quantity: string){
    const quantityInt = parseInt(quantity);
    this._cartService.changeQuantity(cartItem.foods.id, quantityInt);
  }


}
