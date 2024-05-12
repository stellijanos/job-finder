import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/database/job';
import { CompanyService } from '../../company.service';
import { Company } from '../../../models/database/company';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';
import { Category } from '../../../models/database/category';
import { CategoryComponent } from '../../../category/category.component';
import { SkillComponent } from '../../../skill/skill.component';
import { CategoryService } from '../../../category/category.service';
import { SkillService } from '../../../skill/skill.service';
import { JobService } from '../../../job/job.service';
import { Skill } from '../../../models/database/skill';
import { Response } from '../../../models/auth/response';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    SpinnerComponent,
    CategoryComponent,
    SkillComponent
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class C_JobsComponent implements OnInit {

  jobs : Job[] = [];
  categories: Category[] = [];
  skills: Skill[] = [];

  filteredCategories: Category[] = [];
  filteredSkills: Skill[] = [];
  selectedSkills: Number[] = [];

  createJobForm : FormGroup = new FormGroup({});
  createCategoryForm: FormGroup = new FormGroup({});
  createSkillForm: FormGroup = new FormGroup({});

  showSpinner: boolean = true;
  editingJob: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';


  constructor(
    private companyService: CompanyService, 
    private formBuilder: FormBuilder, 
    private categoryService: CategoryService, 
    private skillService: SkillService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.initJobForm();
    this.initCategoryForm();
    this.initSkillForm();
    this.loadData();
  }


  private initJobForm(): void {
    this.createJobForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      skills: [[]]
    });
  }


  private initCategoryForm(): void {
    this.createCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(64)]]
    });
  }


  private initSkillForm(): void {
    this.createSkillForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(64)]]
    });
  }


  private loadData(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => this.categories =  this.filteredCategories = categories); 
    this.skillService.getAll().subscribe((skills: Skill[]) => this.skills = this.filteredSkills = skills);

    this.companyService.getByToken().subscribe((company: Company) => {
      this.jobs = company.jobs || [];
      this.showSpinner = false;
    });
  }


  toggleSkill(id: number) {

    // const skillsArray = this.createJobForm.get('skills')?.value as Array<Number>;
    const skillIndex = this.selectedSkills.indexOf(id);

    if (skillIndex > -1) {
      this.selectedSkills.splice(skillIndex, 1);
    } else {
      this.selectedSkills.push(id);
    }
    this.createJobForm.get('skills')?.setValue(this.selectedSkills);
  }


  searchCategory() {
    this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(this.createCategoryForm.get('name')?.value ));
  }

  
  searchSkill() {
    this.filteredSkills = this.skills.filter(skill => skill.name.toLowerCase().includes(this.createSkillForm.get('name')?.value.toLowerCase()));
  }

  editJob(job: Job) {
    this.createJobForm = this.formBuilder.group({
      id: [job.id],
      title: [job.title, [Validators.required]],
      description: [job.description, [Validators.required]],
      salary: [job.salary, [Validators.required]],
      location: [job.location, [Validators.required]],
      type: [job.type, [Validators.required]],
      category: [job.category.id, [Validators.required]],
      skills: [[]]
    });
    this.selectedSkills = job.skills.map(skill => skill.id);
    this.createJobForm.get('skills')?.setValue(this.selectedSkills);

  }

  updateJob() {
    this.showSpinner = true;


    if (this.createJobForm.valid) {
      let job :Job = this.createJobForm.value;

      this.jobService.update(job).subscribe((response: Response) => {
        if (response.response === "ok") {
          let updatedJob: Job = response.data;

          const index = this.jobs.findIndex(j => j.id === response.data.id);
          if (index !== -1) {
            this.jobs[index] = updatedJob; 
          }
        }

      
        this.selectedSkills = [];

        this.showSpinner = false;
        this.editingJob = false;
      });
    }
  }



  createJob() {

    this.showSpinner = true;

    if (this.createJobForm.valid) {
      let job :Job = this.createJobForm.value;

      this.jobService.create(job).subscribe((response: Response) => {

        if (response.response === "ok") {
          let job : Job = response.data;
          this.jobs.push(job);
        }
        
        this.showSpinner = false;
        this.selectedSkills = [];
        this.initJobForm();
      });
    }
  }


  createCategory() {
    let category: Category = this.createCategoryForm.value;

    this.categoryService.create(category).subscribe((response: Response) => {
      if (response.response === "ok") {
        this.categories.push(response.data);
      }
      this.createCategoryForm.reset('name');
      this.filteredCategories = this.categories;
    });

  }


  createSkill() {
    let skill: Skill = this.createSkillForm.value;

    this.skillService.create(skill).subscribe((response: Response) => {
      if (response.response === "ok") {
        this.skills.push(response.data);
      }

      this.createSkillForm.reset('name');
      this.filteredSkills = this.skills;
    });
  }

  deleteJob() {

  }

}
