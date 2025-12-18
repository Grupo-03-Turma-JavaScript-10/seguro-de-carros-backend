import { Apolice } from "../../apolice/entities/apolice.entity";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";

{Veiculo}
{Apolice}
export interface ClienteSemSenha{
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    apolices?: { id: number; numeroApolice: string }[];
    veiculos?: { id: number; placa: string; modelo: string }[];
}