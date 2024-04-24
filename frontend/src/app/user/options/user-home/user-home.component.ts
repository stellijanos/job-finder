import { Component } from '@angular/core';
import { User } from '../../../models/database/user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Response } from '../../../models/auth/response';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { SpinnerComponent } from '../../../ui-components/spinner/spinner.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SpinnerComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

  showUser: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  user: User = new User();


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.userService.getByToken().subscribe((user: User) => {

      if (!user.id) {
        this.showNotFound = true;
        return;
      } 
      this.user = user;
      this.showSpinner = false;
      this.showUser = true;

    });
  }



}
