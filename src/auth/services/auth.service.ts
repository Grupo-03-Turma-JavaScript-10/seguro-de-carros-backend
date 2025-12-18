import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClienteService } from "../../cliente/services/cliente.service";
import { JwtService } from "@nestjs/jwt";
import { Bcrpyt } from "../bcrypt/bcrypt";
import { ClienteSemSenha } from "../interfaces/cliente-sem-senha.interface";
import { ClientLogin } from "../entities/clientlogin.entity";
import { ClienteResponse } from "../interfaces/cliente-response.interface";

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

    async login(usuario: ClienteSemSenha): Promise<ClienteResponse> {
        const payload = { sub: usuario.email };
        
        return {
            ...usuario,
            token: this.jwtService.sign(payload)
        };
    }
}