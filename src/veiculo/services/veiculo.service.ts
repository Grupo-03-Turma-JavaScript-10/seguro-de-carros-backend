import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) {}

  async create(veiculo: Veiculo): Promise<Veiculo> {
    if (!veiculo.cliente || !veiculo.cliente.id) {
      throw new NotFoundException('Cliente é obrigatório!');
    }

    const cliente = await this.clienteRepository.findOne({
      where: { id: veiculo.cliente.id }
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado!');
    }

    veiculo.cliente = cliente;
    return await this.veiculoRepository.save(veiculo);
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find({
      relations: ['cliente']
    });
  }

  async findById(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id },
      relations: ['cliente']
    });

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado!');
    }

    return veiculo;
  }

  async update(id: number, veiculo: Veiculo): Promise<Veiculo> {
    await this.findById(id);
    veiculo.id = id;
    return await this.veiculoRepository.save(veiculo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.veiculoRepository.delete(id);
  }
}