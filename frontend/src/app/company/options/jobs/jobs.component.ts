import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/database/job';
import { CompanyService } from '../../company.service';
import { Company } from '../../../models/database/company';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';
import { Router } from '@angular/router';
import { CreateJobModalComponent } from '../../create-job-modal/create-job-modal.component';
import { Category } from '../../../models/database/category';
import { createInjectableType } from '@angular/compiler';
import { CategoryComponent } from '../../../category/category.component';
import { SkillComponent } from '../../../skill/skill.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    SpinnerComponent,
    CreateJobModalComponent,
    CategoryComponent,
    SkillComponent
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class C_JobsComponent implements OnInit {


  jobs : Job[] = [];

  

  showContent: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';


  
  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.companyService.getByToken().subscribe((company: Company) => {
      this.jobs = company.jobs || [];
      console.log(this.jobs);

      this.toggleContent();
    });
  }



  toggleContent() {
    this.showSpinner = !this.showSpinner;
    this.showContent = !this.showContent;
  }


}



