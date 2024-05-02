import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-company-home',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './company-home.component.html',
  styleUrl: './company-home.component.css'
})
export class CompanyHomeComponent {

}
