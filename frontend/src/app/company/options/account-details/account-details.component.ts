import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../../../models/database/company';
import { CompanyService } from '../../company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    SpinnerComponent
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class C_AccountDetailsComponent implements OnInit {

  showContent: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  editCompanyForm: FormGroup = new FormGroup({});
  company: Company = new Company();

  hide = true;

  constructor(private companyService: CompanyService, private router: Router, private formBuilder: FormBuilder) {}


  ngOnInit(): void {

    this.editCompanyForm = this.formBuilder.group({
      name : ['', [Validators.required, Validators.max(64)]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.max(64), Validators.pattern('^https://*\.*$')]],
      password: ['', [Validators.required]]
    });

    this.companyService.getByToken().subscribe((company: Company) => {

      if (!company.id) {
        this.showNotFound = true;
        return;
      } 
      this.company = company;

      this.patchValues();

      this.toggleContent();

    });
  }


  saveChanges() {

    this.toggleContent();

    this.errorMessage = '';
    this.successMessage = '';

    let company: Company = this.editCompanyForm.value;
    console.log(company);
    this.companyService.updateByToken(company).subscribe((company: Company) => {
      console.log(company);

      if (!company.id) {
        this.errorMessage = company.response;


      } else {
        this.company = company;
        this.editCompanyForm.reset();
        this.successMessage = 'Company updated successfully!';
      }

      this.patchValues();

      this.toggleContent();

    });
  }

  patchValues() {
    this.editCompanyForm.get('name')?.patchValue(this.company.name);
    this.editCompanyForm.get('email')?.patchValue(this.company.email);
    this.editCompanyForm.get('website')?.patchValue(this.company.website);
  }


  toggleContent() {
    this.showSpinner = !this.showSpinner;
    this.showContent = !this.showContent;
  }
}
