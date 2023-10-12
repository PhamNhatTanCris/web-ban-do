import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartQuantity=0;
  constructor(private _cartService:CartService, private _userService: UserService) {
    _cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    this._userService.userObservable.subscribe((user) => {
      
    })
   }

  ngOnInit(): void {
  }
}
