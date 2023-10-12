import { food } from "./food";

export class CartItem{
  constructor(public foods: food){}
  quantity:number = 1 ;
  price: number = this.foods.price;
}
