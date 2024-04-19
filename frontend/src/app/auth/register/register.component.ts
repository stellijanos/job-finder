import { Component, OnInit } from '@angular/core';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from '../../home/home.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, HomeComponent, RegisterCompanyComponent, RegisterUserComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  showRegisterUser: boolean = true;
  showRegisterCompany: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.showRegisterUser = true;
    // this.showRegisterCompany = false;
  }

}
