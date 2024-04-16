import { Component } from '@angular/core';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterCompanyComponent, RegisterUserComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
