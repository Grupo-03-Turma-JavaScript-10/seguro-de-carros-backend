import { Bcrpyt } from './../../auth/bcrypt/bcrypt';
import { Cliente } from './../entities/cliente.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository:Repository<Cliente>,
        private bcrpyt: Bcrpyt,
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
      const existente =  await this.clienteRepository.findOne(
        {where:[{email:cliente.email},{cpf:cliente.cpf}]}
      );
      if(existente){
        throw new HttpException('O usuario ja existe!',HttpStatus.BAD_REQUEST);
      }
           cliente.senha = await this.bcrpyt.criptografarSenha(cliente.senha)
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
    async findByemail(email:string):Promise<Cliente | null>{
        return await this.clienteRepository.findOne({
            where:{email:email},
            relations:{
                veiculos:true,
                apolices:true
            }
        })
    }
}