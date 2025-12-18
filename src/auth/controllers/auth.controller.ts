import { ClientLogin } from '../entities/clientlogin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { ClienteResponse } from '../interfaces/cliente-response.interface';
import { AuthService } from './../services/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";

@Controller('/clientes')
export class AuthController {
constructor(private authservice: AuthService){}

@UseGuards(LocalAuthGuard)
@Post('/logar')
@HttpCode(HttpStatus.OK)
login(@Body() usuario: ClientLogin):Promise<ClienteResponse>{
    return this.authservice.login(usuario);
}
}