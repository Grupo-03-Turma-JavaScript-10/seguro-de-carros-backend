import { InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from '../entities/veiculo.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, Repository } from 'typeorm';
import { Apolice } from '../../apolice/entities/apolice.entity';

@Injectable()
export class VeiculoService {
    constructor(
        @InjectRepository(Veiculo)
        private veiculoRepository: Repository<Veiculo>,
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>
    ){}

    async findAll(): Promise<Veiculo[]>{
        return await this.veiculoRepository.find()
    }
    async findById(id:number):Promise<Veiculo>{
        const veiculo = await this.veiculoRepository.findOne({
            where:{
                id,
            }
        })
        if(!veiculo){
            throw new NotFoundException(`Veiculo com o ID ${id}não encontrado`)
        }
        return veiculo;
    }

    async create(veiculo:Veiculo):Promise<Veiculo>{
        return await this.veiculoRepository.save(veiculo);
    }
    async update(id:number,veiculoData:Partial<Veiculo>):Promise<Veiculo>{
      const veiculoExistente =   await this.findById(id);
      const veiculoAtualizado = {...veiculoExistente,...veiculoData}
        return await this.veiculoRepository.save(veiculoAtualizado);
    }

    async delete(id:number):Promise<void>{
        await this.findById(id);

        await this.veiculoRepository.delete(id);
    }

}