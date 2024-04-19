import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCredentials } from '../../models/login-credentials.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Response } from '../../models/response.model';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
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
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    this.showSpinner = true;
    if (this.loginForm.valid) {
      let data: LoginCredentials = this.loginForm.value;
      this.authService.login(data).subscribe(res => {
        let response: Response = res;


        if (response.response !== "ok") {
          this.errorMessage = response.response;
        } else {
          this.errorMessage = '';
          this.successMessage = "Login successful!";

          if (response.is_user) {
            this.router.navigate(['/user']);
          } else if (response.is_company) {
            this.router.navigate(['/company'])
          } else {
            this.successMessage = '';
            this.errorMessage = 'Something went wrong, please try again!';
          }
        }

        console.log(response);

        this.showSpinner = false;
      });

    }
  }
}
