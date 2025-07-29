import { UsuarioResponseDTO } from '../dtos/usuario-response.dto';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCoordenadores(empresaId: number): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(`${this.BASE_URL}/usuarios/coordenadores?empresaId=${empresaId}`);
  }

  aprovarCoordenador(id: number): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/usuarios/${id}/aprovar-coordenador`, {});
  }

  rejeitarCoordenador(id: number): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/usuarios/${id}/rejeitar-coordenador`, {});
  }
}
