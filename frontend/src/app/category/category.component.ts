import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../models/database/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  categories: Category[] = [];
  filtered: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.filtered = this.categories;
    });
  }

}
