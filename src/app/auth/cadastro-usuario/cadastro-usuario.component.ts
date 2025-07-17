import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css',
  standalone: true,
  imports: [FormsModule],
})
export class CadastroUsuarioComponent {
  nome = '';
  email = '';
  senha = '';
  cpf = '';
  telefone = '';
  setor = '';
  tipoUsuario = 'COLABORADOR';
  empresaId = 1; 

  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    const payload = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      cpf: this.cpf,
      telefone: this.telefone,
      setor: this.setor,
      tipoUsuario: this.tipoUsuario,
      empresaId: this.empresaId
    };

    this.http.post(`${this.BASE_URL}/usuarios`, payload).subscribe({
      next: () => this.router.navigate(['/aguarde-aprovacao']),
      error: (err) =>
        alert('Erro ao cadastrar: ' + (err.error?.message || 'tente novamente'))
    });
  }
}
