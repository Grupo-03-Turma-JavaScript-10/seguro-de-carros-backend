import { InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from './../entities/veiculo.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class VeiculoService {
    constructor(
        @InjectRepository(Veiculo)
        private veiculoRepository: Repository<Veiculo>,
        //private apoliceRepository: Repository<Apolice>
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
            throw new HttpException('ID não encontrado!',HttpStatus.NOT_FOUND);

        }
        return veiculo;
    }

    async create(veiculo:Veiculo):Promise<Veiculo>{
        return await this.veiculoRepository.save(veiculo);
    }
    async update(veiculo:Veiculo):Promise<Veiculo>{
        await this.findById(veiculo.id);


        return await this.veiculoRepository.save(veiculo);
    }

    async delete(id:number):Promise<DeleteResult>{
        await this.findById(id);

        return await this.veiculoRepository.delete(id);
    }

}