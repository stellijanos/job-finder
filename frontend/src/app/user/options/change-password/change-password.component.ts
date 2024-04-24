import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    SpinnerComponent,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  showContent: boolean = false;
  showSpinner: boolean = true;
  hide : boolean = true;

  errorMessage : string  = '';
  successMessage : string = '';

  changePasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      current: ['', [Validators.required, Validators.maxLength(128)]],
      new: ['', Validators.required],
      confirm: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // setTimeout(() => {
      this.toggleContent();
    // }, 100);

  }


  toggleContent() {
    this.showSpinner = !this.showSpinner;
    this.showContent = !this.showContent;
  }


  changePassword() {
    
  }


}


