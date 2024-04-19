import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../../../models/register-user'; 
import { AuthService } from '../../auth.service';
import { Response } from '../../../models/response.model';
import { RegisterResponse } from '../../../models/register-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  registerUserForm: FormGroup = new FormGroup({});
  showSpinner : boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      middlename: [''],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  passwordsDoNotMatch():boolean {
    return this.registerUserForm.get('confirmPassword')?.value.length > 0 && this.registerUserForm.get('confirmPassword')?.value !== this.registerUserForm.get('password')?.value;
  }

  onSubmit(): void {
    this.showSpinner = true;
    let registerUser: RegisterUser = this.registerUserForm.value;
    
    this.authService.registerUser(registerUser).subscribe((response: RegisterResponse) => {
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
  }
}
