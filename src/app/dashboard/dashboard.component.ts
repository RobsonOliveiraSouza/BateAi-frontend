import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }
}