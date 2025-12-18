import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApoliceService } from './apolice/apolice.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ApoliceService],
})
export class AppModule {}
