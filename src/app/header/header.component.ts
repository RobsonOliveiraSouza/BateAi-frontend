import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isActive = false;

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  closeMenu() {
    this.isActive = false;
  }
}