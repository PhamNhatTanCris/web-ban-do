import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit{
  foods!: food;
  constructor(private _activatedRoute: ActivatedRoute, private _foodService: FoodService, private _cartService: CartService, private router: Router) {
    this._activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this._foodService.getFoodById(params.id).subscribe((serverFood) => {
          this.foods = serverFood;
        })
      }
    })
  };
  ngOnInit(): void {

  }

  addToCart(){
    this._cartService.addToCart(this.foods);
    this.router.navigateByUrl('/cart-page');
  }
}
