import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroPontoDTO } from '../dtos/registro-ponto.dto';
import { UsuarioResumoDTO } from '../dtos/usuario-resumo.dto';
import { EmpresaResumoDTO } from '../dtos/empresa-resumo.dto';

export interface RegistroPontoResponseDTO {
  id: number;
  dataHora: string;
  tipoRegistro: string;
  localizacao: string;
  colaborador: UsuarioResumoDTO;
  empresa: EmpresaResumoDTO;
}

@Injectable({
  providedIn: 'root'
})
export class PontoService {
  private readonly BASE_URL = 'http://localhost:8080/ponto';

  constructor(private http: HttpClient) {}

  registrarPonto(dto: RegistroPontoDTO): Observable<RegistroPontoResponseDTO> {
    return this.http.post<RegistroPontoResponseDTO>(`${this.BASE_URL}/registrar`, dto);
  }

  listarMeusPontos(): Observable<RegistroPontoResponseDTO[]> {
    return this.http.get<RegistroPontoResponseDTO[]>(`${this.BASE_URL}/historico`);
  }
  
}
