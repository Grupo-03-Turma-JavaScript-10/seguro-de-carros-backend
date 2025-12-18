import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';


@Module({
  providers: [ClienteService],
  controllers: [ClienteController]
})
export class ClienteModule {}
