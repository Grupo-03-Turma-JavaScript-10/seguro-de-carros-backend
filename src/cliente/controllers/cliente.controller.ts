import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
@ApiTags('Cliente')
@Controller('/clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll():Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number):Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() cliente: Cliente):Promise<Cliente> {
    return this.clienteService.updateCliente(id, cliente);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clienteService.deleteCliente(id);
  }
}
