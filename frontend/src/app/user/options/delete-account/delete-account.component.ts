import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Response } from '../../../models/auth/response';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    SidebarComponent,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent implements OnInit {


  showContent: boolean = false;
  showSpinner: boolean = true;
  hide = true;

  errorMessage: string = '';

  deleteAccountForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.deleteAccountForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(128)]]
    });

    setTimeout(() => {
      this.toggleContent();
    }, 100);

  }



  deleteAccount() {

    this.toggleContent();

    let password: string = this.deleteAccountForm.get('password')?.value ?? '';

    this.userService.deleteByToken(password).subscribe((response: Response) => {
      if (response.response !== "ok") {
        this.errorMessage = response.response;
        this.hide = true;
        this.toggleContent();
      } else {
        this.router.navigate(['/account-deleted']);
      }
    })
  }


  toggleContent() {
    this.showContent = !this.showContent;
    this.showSpinner = !this.showSpinner;
  }

}
