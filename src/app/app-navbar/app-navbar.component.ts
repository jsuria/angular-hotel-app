import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ICategory } from './icategory';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

    listCategories: Array<ICategory>;

    constructor(private categories: CategoriesService) { }

    ngOnInit(): void {
        this.categories.getAllCategories().subscribe(
            data => {
                this.listCategories = data;
            }
        )
    }
}