import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/database/category';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Job } from '../../models/database/job';

@Component({
  selector: 'app-create-job-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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


  createJobForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.createJobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      skills_str: ['', [Validators.required]]
    });
  }

  createJob() {
    let job :Job = this.createJobForm.value;

    console.log(job);
  }




}
