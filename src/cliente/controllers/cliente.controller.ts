import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
@ApiTags('Cliente')
@Controller('/clientes')
@ApiBearerAuth()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/cadastrar')
  create(@Body() cliente: Cliente):Promise<Cliente> {
    return this.clienteService.create(cliente);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll():Promise<Cliente[]> {
    return this.clienteService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number):Promise<Cliente> {
    return this.clienteService.findById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() cliente: Cliente):Promise<Cliente> {
    return this.clienteService.updateCliente(id, cliente);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clienteService.deleteCliente(id);
  }
}
