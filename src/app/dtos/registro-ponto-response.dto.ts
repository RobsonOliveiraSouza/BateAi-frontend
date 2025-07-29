import { UsuarioResumoDTO } from "./usuario-resumo.dto";
import { EmpresaResumoDTO } from "./empresa-resumo.dto";

export interface RegistroPontoResponseDTO {
    id: number;
    dataHora: string;
    tipoRegistro: string;
    localizacao: string;
    colaborador: UsuarioResumoDTO;
    empresa: EmpresaResumoDTO;
  }