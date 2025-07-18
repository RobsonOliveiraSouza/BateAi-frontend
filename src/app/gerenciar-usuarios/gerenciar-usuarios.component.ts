import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gerenciar-usuarios',
  imports: [CommonModule],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css'
})
export class GerenciarUsuariosComponent {
  usuarios: any[] = [];
  readonly BASE_URL = 'http://localhost:8080';
  empresaId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get<any[]>(`${this.BASE_URL}/usuarios/colaboradores?empresaId=${this.empresaId}`).subscribe({
      next: (colabs) => {
        this.http.get<any[]>(`${this.BASE_URL}/usuarios/coordenadores?empresaId=${this.empresaId}`).subscribe({
          next: (coords) => this.usuarios = [...colabs, ...coords]
        });
      }
    });
  }

  aprovar(usuario: any) {
    const tipo = usuario.tipoUsuario === 'COORDENADOR' ? 'coordenador' : 'colaborador';
    this.http.put(`${this.BASE_URL}/usuarios/${usuario.id}/aprovar-${tipo}`, {}).subscribe({
      next: () => {
        usuario.statusVinculo = 'APROVADO';
      }
    });
  }

  rejeitar(usuario: any) {
    const tipo = usuario.tipoUsuario === 'COORDENADOR' ? 'coordenador' : 'colaborador';
    this.http.put(`${this.BASE_URL}/usuarios/${usuario.id}/rejeitar-${tipo}`, {}).subscribe({
      next: () => {
        usuario.statusVinculo = 'REJEITADO';
      }
    });
  }

  remover(usuario: any) {
    const tipo = usuario.tipoUsuario === 'COORDENADOR' ? 'coordenador' : 'colaborador';
    this.http.put(`${this.BASE_URL}/usuarios/${usuario.id}/remover-${tipo}`, {}).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      }
    });
  }
}