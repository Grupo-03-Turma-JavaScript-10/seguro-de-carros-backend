import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './services/dev.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApoliceModule } from './apolice/apolice.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DevService, imports: [ConfigModule],
  }), VeiculoModule, ApoliceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
