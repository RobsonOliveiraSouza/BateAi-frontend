import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  providers: [],
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent carregado');
  }

  login() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
  
        const role = this.authService.getUserRole();
        const status = this.authService.getUserStatus();
  
        if (status?.startsWith('PENDENTE')) {
          this.router.navigate(['/aguarde-aprovacao']);
        } else if (status?.startsWith('REJEITADO')) {
          this.router.navigate(['/acesso-negado']);
        } else {
          if (role === 'EMPRESA') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'COORDENADOR') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'COLABORADOR') {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Tipo de usuário desconhecido.');
          }
        }
      },
      error: (err) => {
        this.authService.erroLogin();
      }
    });
  }
  irParaCadastroUsuario() {
    this.router.navigate(['/auth/cadastro-usuario']);
  }
  
  irParaCadastroEmpresa() {
    this.router.navigate(['/auth/cadastro-empresa']);
  }
  
}