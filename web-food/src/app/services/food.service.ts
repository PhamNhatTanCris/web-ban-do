import { Injectable } from '@angular/core';
import { food } from '../shared/model/food';
import { sample_foods, sample_tag } from 'src/app/data';
import { Tag } from 'src/app/shared/model/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_URL, FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_BY_TAG_URL, FOOD_TAGS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<food[]> {
    return this._http.get<food[]>(FOODS_URL);
  };

  getAllTag(): Observable<Tag[]> {
    return this._http.get<Tag[]>(FOOD_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<food[]> {
    return tag === "All" ?
      this.getAll() :
      this._http.get<food[]>(FOOD_BY_TAG_URL + tag);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this._http.get<food[]>(FOOD_BY_SEARCH_URL + searchTerm)
  }

  getFoodById(foodid: number): Observable<food> {
    return this._http.get<food>(FOOD_BY_ID_URL + foodid);
  }
}
