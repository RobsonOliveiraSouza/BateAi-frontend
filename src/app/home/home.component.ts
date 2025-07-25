import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    }
  }

  irParaLogin() {
    this.router.navigate(['/auth/login']);
  }

  irParaCadastroEmpresa() {
    this.router.navigate(['/auth/cadastro-empresa']);
  }

  irParaCadastroUsuario() {
    this.router.navigate(['/auth/cadastro-usuario']);
  }
}