import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteController } from './controllers/cliente.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente]),
  forwardRef(()=> AuthModule)],
  providers: [ClienteService],
  controllers: [ClienteController],
  exports:[ClienteService],
})
export class ClienteModule {}
