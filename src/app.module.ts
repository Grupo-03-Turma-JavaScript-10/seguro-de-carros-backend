import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/services/dev.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApoliceModule } from './apolice/apolice.module';
import { ClienteModule } from './cliente/cliente.module';
import { AuthModule } from './auth/auth.module';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: ProdService, imports: [ConfigModule],
  }), VeiculoModule, ApoliceModule, ClienteModule,AuthModule,ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
