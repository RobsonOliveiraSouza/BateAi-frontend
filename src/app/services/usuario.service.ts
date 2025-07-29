import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { StatusVinculo } from '../enums/status-vinculo.enum';
import { EmpresaResumoDTO } from '../dtos/empresa-resumo.dto';
import { UsuarioResponseDTO } from '../dtos/usuario-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly BASE_URL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  listarPendentes(empresaId: number): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(`${this.BASE_URL}/pendentes?empresaId=${empresaId}`);
  }

  listarAprovados(empresaId: number): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(`${this.BASE_URL}/aprovados?empresaId=${empresaId}`);
  }

  listarTodos(empresaId: number): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(`${this.BASE_URL}/colaboradores?empresaId=${empresaId}`);
  }

  rejeitarColaborador(id: number): Observable<string> {
    return this.http.put<string>(`${this.BASE_URL}/${id}/rejeitar-colaborador`, {});
  }

  aprovarColaborador(id: number): Observable<string> {
    return this.http.put<string>(`${this.BASE_URL}/${id}/aprovar-colaborador`, {});
  }
}
