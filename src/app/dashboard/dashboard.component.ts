import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { EmpresaService } from '../services/empresa.service';
import { UsuarioService } from '../services/usuario.service';
import { PontoService } from '../services/ponto.service';
import { RegistroPontoDTO } from '../dtos/registro-ponto.dto';
import { UsuarioResponseDTO } from '../dtos/usuario-response.dto';
import { RegistroPontoResponseDTO } from '../services/ponto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string | null = null;

  // EMPRESA
  coordenadores: UsuarioResponseDTO[] = [];

  // COORDENADOR
  colaboradores: UsuarioResponseDTO[] = [];
  colaboradorSelecionadoId: number | null = null;
  tipoRegistro: string = '';
  localizacao: string = '';
  mensagemRegistro: string = '';

  // PONTO
  historicoPontos: RegistroPontoResponseDTO[] = [];
  
  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private pontoService: PontoService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();

    if (this.role === 'EMPRESA') {
      this.carregarCoordenadores();
    }

    if (this.role === 'COORDENADOR') {
      this.carregarColaboradores();
    }

    if (this.role === 'COLABORADOR') {
      this.carregarHistoricoPontos();
    }    
  }

  carregarCoordenadores(): void {
    const empresaId = this.authService.getEmpresaId();
    if (!empresaId) return;

    this.empresaService.getCoordenadores(empresaId).subscribe({
      next: (coordenadores) => {
        this.coordenadores = coordenadores;
      },
      error: (err) => {
        console.error('Erro ao carregar coordenadores:', err);
      }
    });
  }

  carregarColaboradores(): void {
    const empresaId = this.authService.getEmpresaId();
    if (!empresaId) return;
  
    this.usuarioService.listarTodos(empresaId).subscribe({
      next: (res) => this.colaboradores = res,
      error: () => this.colaboradores = []
    });
  }


  aprovar(id: number): void {
    this.empresaService.aprovarCoordenador(id).subscribe(() => {
      this.carregarCoordenadores();
    });
  }

  rejeitar(id: number): void {
    this.empresaService.rejeitarCoordenador(id).subscribe(() => {
      this.carregarCoordenadores();
    });
  }

  get coordenadoresPendentes(): UsuarioResponseDTO[] {
    return this.coordenadores?.filter(c => c.statusVinculo === 'PENDENTE_COORDENADOR') || [];
  }

  registrarPonto(): void {
    if (!this.tipoRegistro) {
      this.mensagemRegistro = 'Selecione o tipo de registro.';
      return;
    }
  
    const dto: RegistroPontoDTO = {
      tipoRegistro: this.tipoRegistro as any,
      localizacao: this.localizacao
    };
  
    this.pontoService.registrarPonto(dto).subscribe({
      next: (res) => {
        this.mensagemRegistro = `Ponto registrado com sucesso: ${res.tipoRegistro} às ${res.dataHora}`;
        this.tipoRegistro = '';
        this.localizacao = '';
        this.carregarHistoricoPontos();
      },
      error: () => {
        this.mensagemRegistro = 'Erro ao registrar ponto.';
      }
    });
  }  
  
  logout(): void {
    this.authService.logout();
  }

  aprovarColaborador(id: number): void {
    this.usuarioService.aprovarColaborador(id).subscribe(() => {
      this.carregarColaboradores();
    });
  }
  
  rejeitarColaborador(id: number): void {
    this.usuarioService.rejeitarColaborador(id).subscribe(() => {
      this.carregarColaboradores();
    });
  }
  
  get colaboradoresPendentes(): UsuarioResponseDTO[] {
    return this.colaboradores?.filter(c => c.statusVinculo === 'PENDENTE_COLABORADOR') || [];
  }
  
  carregarHistoricoPontos(): void {
    this.pontoService.listarMeusPontos().subscribe({
      next: (res) => this.historicoPontos = res,
      error: () => this.historicoPontos = []
    });
  }  
}
