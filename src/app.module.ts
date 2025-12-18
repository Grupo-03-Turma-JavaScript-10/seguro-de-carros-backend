import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevService } from './services/dev.service';
import { ConfigModule } from '@nestjs/config';
import { VeiculoModule } from './veiculo/veiculo.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DevService,
    imports: [ConfigModule],
  }),
  VeiculoModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
