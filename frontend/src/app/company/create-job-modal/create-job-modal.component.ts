import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/database/category';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-job-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './create-job-modal.component.html',
  styleUrl: './create-job-modal.component.css'
})
export class CreateJobModalComponent implements OnInit {

  categories: Category[] =[
    {id: 1, name:"Healthcare", jobs:[]},
    {id: 2, name:"Technology", jobs:[]},
    {id: 3, name:"Education", jobs:[]},
    {id: 4, name:"Finance", jobs:[]},
    {id: 5, name:"Retail", jobs:[]},
    {id: 6, name:"Hospitality", jobs:[]},
    {id: 7, name:"Construction", jobs:[]},
    {id: 8, name:"Marketing", jobs:[]},
    {id: 9, name:"Legal", jobs:[]},
    {id: 10, name:"Transportation", jobs:[]}
]


  createJobForm: FormGroup = new FormGroup({});

  // constructor()


  ngOnInit(): void {
    
  }


}
