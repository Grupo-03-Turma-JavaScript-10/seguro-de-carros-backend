import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Apolice } from '../entities/apolice.entity';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';


@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>) { }

    async calcularApolice(valorBase: number, veiculo: Veiculo): Promise<number> {
    const anoAtual = new Date().getFullYear();
    const idadeVeiculo = anoAtual - veiculo.ano; 
    
    if (idadeVeiculo > 10) {
        return valorBase * 0.80; 
    }
    return valorBase;
}

    async criarApolice(apolice: Apolice): Promise<Apolice> {
    
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: apolice.veiculo.id }
    });
    
    if (!veiculo) {
        throw new NotFoundException('Veículo não encontrado!');
    }
    apolice.veiculo = veiculo;
    apolice.valor = await this.calcularApolice(apolice.valor, veiculo);
    return this.apoliceRepository.save(apolice);
}

    async findOne(id: number): Promise<Apolice>{
      const apolice = await this.apoliceRepository.findOne({
        where: { id }
      });

      if (!apolice) {
        throw new NotFoundException(`Apolice com ID ${id} não encontrada`);
      }

      return apolice;
    }

    async findByNumeroApolice(numeroApolice: string): Promise<Apolice[]> {
      return await this.apoliceRepository.find({
        where: { numeroApolice: ILike(`%${numeroApolice}%`) }
      });
    }

    async updateApolice(id: number, apolice: Apolice): Promise<Apolice>{
      const apoliceToUpdate = await this.findOne(id);
      return this.apoliceRepository.save({
        ...apoliceToUpdate,
        ...apolice
      });
    }

    async deleteApolice(id: number): Promise<DeleteResult>{
      await this.findById(id)
      return this.apoliceRepository.delete(id);
    }

    async findAll(): Promise<Apolice[]> {
      return await this.apoliceRepository.find();
    }

    async findById(id:number): Promise<Apolice | null>{
      return await this.apoliceRepository.findOne({
        where:{id},
      });

    }   
}
