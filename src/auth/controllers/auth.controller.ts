import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { ClientLogin } from '../entities/clientlogin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { ClienteResponse } from '../interfaces/cliente-response.interface';
import { ClienteService } from '../../cliente/services/cliente.service';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@ApiTags('Autenticação')
@Controller('/clientes')
export class AuthController {
  constructor(
    private authservice: AuthService,
    private clienteService: ClienteService,
  ){}

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async cadastrar(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/logar')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ClientLogin })
  async login(@Request() req: any): Promise<ClienteResponse> {
    return this.authservice.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  async getMe(@Request() req: any): Promise<Cliente> {
    return this.clienteService.findById(req.user.id);
  }
}