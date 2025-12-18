import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apolice } from './entities/apolice.entity';
import { ApoliceService } from './services/apolice.service';
import { ApoliceController } from './controllers/apolice.controller';
import { Veiculo } from '../veiculo/entities/veiculo.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apolice, Veiculo, Cliente])],
  controllers: [ApoliceController],
  providers: [ApoliceService],
  exports: [ApoliceService]
})
export class ApoliceModule {}