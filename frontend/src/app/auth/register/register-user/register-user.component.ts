import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUser } from '../../../models/register-user.model';

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

  
  constructor(private formBuilder: FormBuilder) {}

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
    let registerUser: RegisterUser = this.registerUserForm.value;
    console.log(registerUser);

  }
}
