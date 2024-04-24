import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCredentials } from '../../models/auth/login-credentials';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Response } from '../../models/auth/response';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { SpinnerComponent } from '../../ui-components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    HomeComponent, 
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({});

  errorMessage: string = '';
  successMessage: string = '';
  showSpinner: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  
  validEmail(): boolean | undefined {
    return this.loginForm.get('email')?.valid && this.loginForm.get('email')?.touched 
  }

  invalidEmail(): boolean | undefined {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched
  }

  validPassword(): boolean | undefined {
    return this.loginForm.get('password')?.valid && this.loginForm.get('password')?.touched
  }

  invalidPassword(): boolean | undefined{
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
  }


  onSubmit() {

    this.showSpinner = true;
    if (this.loginForm.valid) {
      let data: LoginCredentials = this.loginForm.value;
      this.authService.login(data).subscribe( (response: Response) => {

        if (response.response !== "ok") {

          this.errorMessage = response.response;
          this.loginForm.reset();

        } else {
          this.errorMessage = '';
          this.successMessage = "Login successful!";

          if (response.is_user) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/user']);

          } else if (response.is_company) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/company']);

          } else {
            this.successMessage = '';
            this.errorMessage = 'Something went wrong, please try again!';
          }
        }
        this.showSpinner = false;
      });
    }
  }
}
