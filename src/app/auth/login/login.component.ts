import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  email = '';
  senha = '';
  tipoLogin = 'usuario'; // valor padrão

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent carregado');
  }

  login() {
    const loginRequest = { email: this.email, senha: this.senha };

    const login$ = this.tipoLogin === 'empresa'
      ? this.authService.loginEmpresa(loginRequest)
      : this.authService.loginUsuario(loginRequest);

    login$.subscribe({
      next: (res) => {
        console.log('Resposta do login:', res);
        localStorage.setItem('token', res.token);

        const role = this.authService.getUserRole();
        const status = this.authService.getUserStatus();

        console.log('Role:', role);
        console.log('Status:', status);

        if (role === 'EMPRESA') {
          // empresas não têm status, vão direto para o dashboard
          this.router.navigate(['/dashboard']);
        } else {
          if (status?.startsWith('PENDENTE')) {
            this.router.navigate(['/aguarde-aprovacao']);
          } else if (status?.startsWith('REJEITADO')) {
            this.router.navigate(['/acesso-negado']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      },
      error: () => {
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
