import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { ClientLogin } from '../entities/clientlogin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { ClienteResponse } from '../interfaces/cliente-response.interface';

@ApiTags('Autenticação')
@Controller('/clientes')
export class AuthController {
  constructor(private authservice: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('/logar')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ClientLogin })
  async login(@Request() req: any): Promise<ClienteResponse> {
    return this.authservice.login(req.user);
  }
}