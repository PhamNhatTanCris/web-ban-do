import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  constructor(private cartService: CartService,
              private formbuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private router: Router) {
                const cart = this.cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }
  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formbuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning("Please fill the inputs", "Invalid inputs");
      return;
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning("Please select your location on the map", "Location");
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl("/payment");
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart')
      }
    })
  }
}
