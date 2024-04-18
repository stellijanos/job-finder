import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCredentials } from '../../models/login-credentials.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Response } from '../../models/response.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let data: LoginCredentials = this.loginForm.value;
      this.authService.login(data).subscribe(res => {
        let response: Response = res;

        console.log(response);
      });

    }
  }
}
