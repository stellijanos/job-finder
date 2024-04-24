import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Response } from '../../models/auth/response';
import { TokenService } from '../../token/token.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  showSpinner: boolean = true;

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.authService.logout().subscribe((response: Response) => {
      if (response.response === 'ok') {
        this.tokenService.clearToken();
      }
      this.router.navigate(['/login']);
    });
  }
}
