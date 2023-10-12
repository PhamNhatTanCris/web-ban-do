import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/model/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tag?: Tag[]
  constructor(private _foodService: FoodService) {
    _foodService.getAllTag().subscribe((serverTag) => {
      this.tag = serverTag;
    });
  }
  ngOnInit(): void {
  }

}
