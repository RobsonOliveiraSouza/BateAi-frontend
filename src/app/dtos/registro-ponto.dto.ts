import { TipoRegistro } from "../enums/tipo-registro.enum";

export interface RegistroPontoDTO {
    tipoRegistro: TipoRegistro;
    localizacao?: string;
}