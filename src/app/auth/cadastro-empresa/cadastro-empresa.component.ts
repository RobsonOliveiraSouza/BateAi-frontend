import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css',
})
export class CadastroEmpresaComponent {
  razaoSocial = '';
  nomeFantasia = '';
  cnpj = '';
  emailResponsavel = '';
  senhaResponsavel = '';
  endereco = '';

  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    const payload = {
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj,
      emailResponsavel: this.emailResponsavel,
      senhaResponsavel: this.senhaResponsavel,
      endereco: this.endereco
    };

    this.http.post(`${this.BASE_URL}/empresas`, payload).subscribe({
      next: () => {
        alert('Empresa cadastrada com sucesso! Verifique seu e-mail.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) =>
        alert('Erro ao cadastrar empresa: ' + (err.error?.message || 'tente novamente'))
    });
  }
}
