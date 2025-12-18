import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Apolice } from '../entities/apolice.entity';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>) { }

    async calcularApolice(valorBase: number, veiculo: Veiculo): Promise<number> {
      const anoAtual = new Date().getFullYear();
      const idadeVeiculo = anoAtual - veiculo.ano; 
      
      if (idadeVeiculo > 10) {
          return valorBase * 0.80; 
      }
      return valorBase;
    }

    async create(apolice: Apolice): Promise<Apolice> {
      if (!apolice.cliente || !apolice.cliente.id) {
        throw new NotFoundException('Cliente é obrigatório!');
      }

      const cliente = await this.clienteRepository.findOne({
        where: { id: apolice.cliente.id }
      });

      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado!');
      }

      const veiculo = await this.veiculoRepository.findOne({
        where: { id: apolice.veiculo.id }
      });
      
      if (!veiculo) {
        throw new NotFoundException('Veículo não encontrado!');
      }
      
      apolice.numeroApolice = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      if (!apolice.dataInicio) {
        apolice.dataInicio = new Date();
      }
      
      if (!apolice.dataFim) {
        const umAnoDepois = new Date(apolice.dataInicio);
        umAnoDepois.setFullYear(umAnoDepois.getFullYear() + 1);
        apolice.dataFim = umAnoDepois;
      }

      apolice.cliente = cliente;
      apolice.veiculo = veiculo;
      apolice.valor = await this.calcularApolice(apolice.valor, veiculo);

      return await this.apoliceRepository.save(apolice);
    }

    async findById(id: number): Promise<Apolice> {
      const apolice = await this.apoliceRepository.findOne({
        where: { id },
        relations: ['cliente', 'veiculo']
      });

      if (!apolice) {
        throw new NotFoundException(`Apólice com ID ${id} não encontrada`);
      }

      return apolice;
    }

    async findByNumeroApolice(numeroApolice: string): Promise<Apolice[]> {
      return await this.apoliceRepository.find({
        where: { numeroApolice: ILike(`%${numeroApolice}%`) }
      });
    }

    async updateApolice(id: number, apolice: Apolice): Promise<Apolice> {
      const apoliceToUpdate = await this.findById(id);
      return this.apoliceRepository.save({
        ...apoliceToUpdate,
        ...apolice
      });
    }

    async deleteApolice(id: number): Promise<DeleteResult> {
      await this.findById(id);
      return this.apoliceRepository.delete(id);
    }

    async findAll(): Promise<Apolice[]> {
      return await this.apoliceRepository.find({
        relations: ['cliente', 'veiculo']
      });
    }
}
