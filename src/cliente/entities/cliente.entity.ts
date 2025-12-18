import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() cliente: Cliente) {
    return this.clienteService.create(cliente);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.clienteService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() cliente: Cliente) {
    return this.clienteService.update(id, cliente);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clienteService.delete(id);
  }
}

export { Cliente };
