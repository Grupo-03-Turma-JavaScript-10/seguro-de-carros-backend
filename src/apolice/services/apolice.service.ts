import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Apolice } from '../entities/apolice.entity';


@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>) { }

    async criarApolice(apolice: Apolice): Promise<Apolice>{
      return this.apoliceRepository.save(apolice);
    }

    async findAll(): Promise<Apolice[]>{
      return await this.apoliceRepository.find();
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

    async deleteApolice(id: number): Promise<void>{
      await this.apoliceRepository.delete(id);
    }
}
