import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}
  

  @ApiExcludeEndpoint()
  @Get()
  async redirect(@Res() respota:any) {
    return respota.redirect('/swagger')
  }
}
