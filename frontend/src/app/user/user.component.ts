import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/database/user';
import { Response } from '../models/auth/response';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  showUser: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  editUserForm: FormGroup = new FormGroup({});

  user: User = new User();

  private token: string = localStorage.getItem('token') ?? '';

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {


    this.editUserForm = this.formBuilder.group({
      firstname : ['', [Validators.required, Validators.max(64)]],
      middlename: ['', [Validators.required, Validators.max(64)]],
      lastname: ['', [Validators.required, Validators.max(64)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.userService.getUser(this.token).subscribe((user: User) => {

      if (!user.id) {
        this.showNotFound = true;
        return;
      } 

      console.log(user);
      this.user = user;

      this.editUserForm.get('firstname')?.patchValue(this.user.firstname);
      this.editUserForm.get('middlename')?.patchValue(this.user.middlename);
      this.editUserForm.get('lastname')?.patchValue(this.user.lastname);
      this.editUserForm.get('email')?.patchValue(this.user.email);

      console.log(this.user);

      this.showSpinner = false;
      this.showUser = true;

    });
  }


  update() {

    let user: User = this.editUserForm.value;

    this.userService.update(this.token, user).subscribe((user: User) => {
      console.log(user);
    });
  }

  delete() {
    this.userService.delete(this.token, this.user.password).subscribe((response: Response) => {
      if (response.response === "ok") {
        this.router.navigate(['/account-deleted']);
      }
    })
  }
}
