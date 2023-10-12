import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { food } from '../../../shared/model/food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: food[] = [];
  constructor(private _foodService: FoodService, private _activatedRoute: ActivatedRoute) {
    let foodObservable: Observable<food[]>
    _activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodObservable = this._foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if (params.tag) {
        foodObservable = this._foodService.getAllFoodsByTag(params.tag)
      }
      else
        foodObservable = _foodService.getAll();

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    }
    )
  }

  ngOnInit(): void {

  }

}
