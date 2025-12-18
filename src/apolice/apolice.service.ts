import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apolice } from './entities/apolice.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Veiculo } from '../veiculo/entities/veiculo.entity';

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ) {}

  async criarApolice(
    numeroApolice: string,
    valor: number,
    dataInicio: Date,
    dataFim: Date,
    clienteId: number,
    veiculoId: number,
  ): Promise<Apolice> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const veiculo = await this.veiculoRepository.findOne({
      where: { id: veiculoId },
    });

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    const apolice = this.apoliceRepository.create({
      numeroApolice,
      valor,
      dataInicio,
      dataFim,
      cliente,
      veiculo,
    });

    return this.apoliceRepository.save(apolice);
  }

  async listarApolices(): Promise<Apolice[]> {
    return this.apoliceRepository.find({
      relations: ['cliente', 'veiculo'],
    });
  }
}
