import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { StatusVinculo } from '../enums/status-vinculo.enum';
import { EmpresaResumoDTO } from '../dtos/empresa-resumo.dto';

export interface UsuarioResponseDTO {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
    setor?: string;
    tipoUsuario: TipoUsuario;
    statusVinculo: StatusVinculo;
    empresa?: EmpresaResumoDTO;
  }