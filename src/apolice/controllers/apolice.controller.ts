import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";
import { Apolice } from "../entities/apolice.entity";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";
import { DeleteResult } from "typeorm";

@Controller("/apolice")
export class ApoliceController{
    constructor(private readonly apoliceService: ApoliceService){
    }

    @Get()
    findAll(){
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
        return this.apoliceService.criarApolice(apolice);
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