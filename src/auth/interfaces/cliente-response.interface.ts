export interface ClienteResponse {
    id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  token:string;
  apolices?: { id: number; numeroApolice: string }[];
  veiculos?: { id: number; placa: string; modelo: string }[];
}