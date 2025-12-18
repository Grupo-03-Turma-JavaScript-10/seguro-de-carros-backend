import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cliente } from "../entities/cliente.entity";


@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository:Repository<Cliente>
    ){}

    async findAll(): Promise<Cliente[]>{
        return await this.clienteRepository.find({
            relations:{
                veiculos:true,
                apolices:true
            }
        })
    }

    async findById(id:number):Promise<Cliente>{
        const cliente = await this.clienteRepository.findOne({
            where:{id},
            relations:{
                veiculos:true,
                apolices:true
            }
        })
        if(!cliente){
            throw new NotFoundException(`Cliente com o ID ${id}não encontrado`)
        }
        return cliente;
    }

    async create(cliente:Cliente):Promise<Cliente>{
        return await this.clienteRepository.save(cliente)
    }

    async updateCliente(id: number, clienteData: Partial<Cliente>): Promise<Cliente> {
        const clienteExistente = await this.findById(id);
        const clienteAtualizado = {...clienteExistente,...clienteData}

        return await this.clienteRepository.save(clienteAtualizado);
    }

    async deleteCliente(id:number): Promise<void>{
        await this.findById(id);
        await this.clienteRepository.delete(id);
    }
}