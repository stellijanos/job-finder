import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { ChangePassword } from '../../../models/user/change-password';
import { Response } from '../../../models/auth/response';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class C_ChangePasswordComponent {

  
  showContent: boolean = false;
  showSpinner: boolean = true;
  hide : boolean = true;

  errorMessage : string  = '';
  successMessage : string = '';

  changePasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService) {}

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

    this.companyService.changePasswordByToken(changePasswordJSON).subscribe((response: Response) => {
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
