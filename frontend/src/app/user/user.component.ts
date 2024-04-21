import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/database/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  showUser: boolean = false;
  showSpinner: boolean = true;
  showNotFound: boolean = false;

  user: User = new User();

  private token: string = localStorage.getItem('token') ?? '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getUser(this.token).subscribe((user: User) => {

      if (!user.id) {
        this.showNotFound = true;
        return;
      } 

      console.log(user);
      this.user = user;

      this.showSpinner = false;
      this.showUser = true;

    });


  }

}
