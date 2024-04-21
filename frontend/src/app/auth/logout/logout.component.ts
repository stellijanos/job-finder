import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Response } from '../../models/auth/response';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  showSpinner: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    let token: string = localStorage.getItem('token') ?? '';
    if (!token) {
      this.router.navigate(['/login']);   
      return; 
    }

    this.authService.logout(token).subscribe((response: Response) => {
      if (response.response === 'ok') {
        localStorage.removeItem('token');
      }
      this.router.navigate(['/login']);
    });
  }
}
