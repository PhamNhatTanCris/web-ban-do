import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchTerm = '';
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router){
    _activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        this.searchTerm = params.searchTerm;
      }
    })
  }
  ngOnInit(): void {

  }
  search(term: string){
    if(term){
      this._router.navigateByUrl('/search/' + term);
    }
  }
}
