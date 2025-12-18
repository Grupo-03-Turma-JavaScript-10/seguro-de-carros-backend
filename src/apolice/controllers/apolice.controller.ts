import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult } from "typeorm";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Apolice')
@Controller("/apolice")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ApoliceController{
    constructor(private readonly apoliceService: ApoliceService){
    }
    
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise <Apolice[]> {
        return this.apoliceService.findAll();
    }
    
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)id:number):Promise<Apolice | null > {
        return this.apoliceService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() apolice:Apolice):Promise<Apolice>{
        return this.apoliceService.create(apolice);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id',ParseIntPipe)id:number, @Body()apolice:Apolice):Promise<Apolice>{
        return this.apoliceService.updateApolice(id, apolice);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id',ParseIntPipe)id:number): Promise<DeleteResult >{
        return this.apoliceService.deleteApolice(id);
    }

}