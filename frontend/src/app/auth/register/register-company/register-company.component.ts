import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterCompany } from '../../../models/register-company.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {
  registerCompanyForm: FormGroup = new FormGroup({});

  showSpinner: boolean = false;

  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerCompanyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  passwordsDoNotMatch():boolean {
    return this.registerCompanyForm.get('confirmPassword')?.value.length > 0 && this.registerCompanyForm.get('confirmPassword')?.value !== this.registerCompanyForm.get('password')?.value;
  }

  onSubmit(): void {
    let registerCompany: RegisterCompany = this.registerCompanyForm.value;
    console.log(registerCompany);
  }

}

