import { Component, OnInit } from '@angular/core';
import { ConcurrencyProblemsService } from './concurrency-problems.service';
import { Response } from '../models/auth/response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concurrency-problems',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './concurrency-problems.component.html',
  styleUrl: './concurrency-problems.component.css'
})
export class ConcurrencyProblemsComponent implements OnInit {

  successMessages: String[] = [];
  errorMessages: String[] = [];

  constructor(private service: ConcurrencyProblemsService) {
  }

  ngOnInit(): void {

  }


  testConcurrencies() {
    this.errorMessages = [];
    this.successMessages = [];


    this.service.lost_update().subscribe((response: Response) => {
      if (response.response === "ok") {
        this.successMessages.push("Lost update successful");
      } else {
        this.errorMessages.push("Lost update failed!");
      }
    });


    this.service.dirty_read().subscribe( {
      next: (response: Response) => {
        if (response.response === "ok") {
          this.successMessages.push("Dirty read successful");
        } else {
          // Handle other types of responses, if necessary
          this.errorMessages.push("Unexpected response received");
        }
      },
      error: (error) => {
        this.errorMessages.push("Dirty read failed!");
      }
    });

    this.service.incorrect_summary().subscribe((response: Response) => {
      if (response.response === "ok") {
        this.successMessages.push("Incorrect summary successful");
      } else {
        this.errorMessages.push("Incorrect summary failed!");
      }
    });

    this.service.unrepeatable_read().subscribe((response: Response) => {
      if (response.response === "ok") {
        this.successMessages.push("Unrepeatable read successful");
      } else {
        this.errorMessages.push("Unrepeatable read failed!");
      }
    });


    this.service.phantom_read().subscribe((response: Response) => {
      if (response.response === "ok") {
        this.successMessages.push("Phantom read successful");
      } else {
        this.errorMessages.push("Phantom read failed!");
      }
    });
  }

}
