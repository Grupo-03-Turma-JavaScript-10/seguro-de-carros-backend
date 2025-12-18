import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClienteService } from "../../cliente/services/cliente.service";
import { JwtService } from "@nestjs/jwt";
import { Bcrpyt } from "../bcrypt/bcrypt";
import { ClienteSemSenha } from "../interfaces/cliente-sem-senha.interface";
import { ClientLogin } from "../entities/clientlogin.entity";
@Injectable()
export class AuthService{
    constructor(
        private ClienteService: ClienteService,
        private jwtService: JwtService,
        private bcrypt: Bcrpyt
    ){}

    async validateUser(email:string,password:string):Promise<ClienteSemSenha>{
        const buscarUsuario = await this.ClienteService.findByemail(email);

        if(!buscarUsuario){
            throw new HttpException('Email não encotrado!',HttpStatus.NOT_FOUND);
        }
        const matchPassword = await this.bcrypt.compararSenhas(password,buscarUsuario.senha);

        if(!matchPassword){
            throw new HttpException('senha invalida!',HttpStatus.UNAUTHORIZED);
        }
        const {senha, ...resposta} = buscarUsuario;
        return resposta;
    }

    async login (usuarioLogin: ClientLogin ) {
        const payload = {sub: usuarioLogin.usuario};
        const buscarUsuario = await this.ClienteService.findByemail(usuarioLogin.usuario);
        if(!buscarUsuario){
            throw new HttpException('Usuario não encontrado!',HttpStatus.NOT_FOUND)
        }
        return {
            id: buscarUsuario?.id,
            nome: buscarUsuario?.nome,
            telefone: buscarUsuario?.telefone,
            email: buscarUsuario?.email,
            cpf: buscarUsuario?.cpf,
            apolices:buscarUsuario?.apolices,
            veiculos:buscarUsuario?.veiculos,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}