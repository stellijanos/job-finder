import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from '../models/database/category';
import { Response } from '../models/auth/response';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {


  createForm: FormGroup = new FormGroup({});

  categories: Category[] = [];
  filtered: Category[] = [];

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(64)]]
    });

    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.filtered = this.categories;
    });
  }

  onSubmit() {
    let category: Category = this.createForm.value;
    console.log(category);

    this.categoryService.create(category).subscribe((response: Response) => {
      if (response.response === "ok") {
        console.log(response);
        this.categories.push(response.data);
      }
    });

    this.filtered = this.categories;
  }

  searchCategory() {

    this.filtered = this.categories.filter(category => category.name.toLowerCase().includes(this.createForm.get('name')?.value ));
  }

}
