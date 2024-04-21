import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-deleted',
  standalone: true,
  imports: [],
  templateUrl: './account-deleted.component.html',
  styleUrl: './account-deleted.component.css'
})
export class AccountDeletedComponent implements OnInit {

  seconds: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const counter = setInterval(() => {


      if (this.seconds === 1) {
        clearInterval(counter);
        this.router.navigate(['/login']);
      }
      this.seconds--;

    }, 1000);
  }

}
