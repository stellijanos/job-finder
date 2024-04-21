import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  currentRoute: string = '';

  isSidebarClosed: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }


  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

}

