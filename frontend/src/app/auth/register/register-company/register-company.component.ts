import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterCompany } from '../../../models/auth/register-company';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { RegisterResponse } from '../../../models/auth/register-response';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {
  registerCompanyForm: FormGroup = new FormGroup({});

  showSpinner: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';
  

  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {}

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

    this.showSpinner = true;
    let company: RegisterCompany = this.registerCompanyForm.value;

    this.authService.registerCompany(company).subscribe((response: RegisterResponse) => {
        console.log(response);

        if (['', undefined, null].includes(response.response)) {
          this.errorMessage = 'Something went wrong, please try again!';
        } else if (response.response !== 'ok') {
          this.errorMessage = response.response;
        } else {
          this.errorMessage = '';
          this.successMessage = 'Registration was successful!';
          this.router.navigate(['/login']);
        }
        this.showSpinner = false;
    });


    // console.log(registerCompany);
  }

}

