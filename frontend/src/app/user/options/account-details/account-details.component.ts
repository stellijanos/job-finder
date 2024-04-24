import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { User } from '../../../models/database/user';
import { UserService } from '../../user.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
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
export class AccountDetailsComponent implements OnInit {


  showContent: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  editUserForm: FormGroup = new FormGroup({});
  user: User = new User();

  hide = true;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}


  ngOnInit(): void {

    this.editUserForm = this.formBuilder.group({
      firstname : ['', [Validators.required, Validators.max(64)]],
      middlename: ['', [Validators.max(64)]],
      lastname: ['', [Validators.required, Validators.max(64)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.userService.getByToken().subscribe((user: User) => {

      if (!user.id) {
        this.showNotFound = true;
        return;
      } 
      this.user = user;

      this.patchValues();

      this.toggleContent();

    });
  }


  saveChanges() {

    this.toggleContent();

    this.errorMessage = '';
    this.successMessage = '';

    let user: User = this.editUserForm.value;
    console.log(user);
    this.userService.updateByToken(user).subscribe((user: User) => {
      console.log(user);

      if (!user.id) {
        this.errorMessage = user.response;


      } else {
        this.user = user;
        this.editUserForm.reset();
        this.successMessage = 'User updated successfully!';
      }

      this.patchValues();

      this.toggleContent();

    });
  }

  patchValues() {
    this.editUserForm.get('firstname')?.patchValue(this.user.firstname);
    this.editUserForm.get('middlename')?.patchValue(this.user.middlename);
    this.editUserForm.get('lastname')?.patchValue(this.user.lastname);
    this.editUserForm.get('email')?.patchValue(this.user.email);
  }


  toggleContent() {
    this.showSpinner = !this.showSpinner;
    this.showContent = !this.showContent;
  }

}

