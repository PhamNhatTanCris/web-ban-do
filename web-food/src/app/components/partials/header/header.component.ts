import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;
  constructor(private _cartService: CartService, private _userService: UserService) {
    _cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    this._userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  logout() {
    this._userService.logout()
  }

  get isAuth() {
    return this.user.token;
  }

  ngOnInit(): void {
  }
}
