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
import { ChangePassword } from '../../../models/user/change-password';
import { UserService } from '../../user.service';
import { Response } from '../../../models/auth/response';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      current: ['', [Validators.required, Validators.maxLength(128)]],
      new: ['', Validators.required],
      confirm: ['', Validators.required]
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

    this.toggleContent();
    
    let changePasswordJSON: ChangePassword = this.changePasswordForm.value;

    this.userService.changePasswordByToken(changePasswordJSON).subscribe((response: Response) => {
      console.log(response);

      if (response.response !== "ok") {
        this.successMessage = '';
        this.errorMessage = response.response;

      } else {
        this.errorMessage = '';
        this.successMessage = 'Password changed successfully!';
      }

      this.changePasswordForm.reset();
      this.toggleContent();
    });

  }


  invalidInput(name: string) {
    return this.changePasswordForm.get(name)?.invalid && this.changePasswordForm.get(name)?.touched;
  }


  passwordsDoMatch() {
    return this.changePasswordForm.get('new')?.value === this.changePasswordForm.get('confirm')?.value;
  }


  validSubmit() {
    return this.changePasswordForm.valid && this.passwordsDoMatch();
  }


}


