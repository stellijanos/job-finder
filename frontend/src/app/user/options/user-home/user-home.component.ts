import { Component } from '@angular/core';
import { User } from '../../../models/database/user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Response } from '../../../models/auth/response';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

  showUser: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  user: User = new User();

  private token: string = localStorage.getItem('token') ?? '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.userService.getUser(this.token).subscribe((user: User) => {

      if (!user.id) {
        this.showNotFound = true;
        return;
      } 
      this.user = user;
      this.showSpinner = false;
      this.showUser = true;

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
