import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { VeiculoService } from "../services/veiculo.service";
import { Veiculo } from "../entities/veiculo.entity";

@Controller("/veiculos")
export class VeiculoController {
    constructor(private readonly veiculoService: VeiculoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Veiculo[]> {
        return this.veiculoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Veiculo> {
        return this.veiculoService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() veiculo: Veiculo): Promise<Veiculo> {
        return this.veiculoService.create(veiculo);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() veiculo: Veiculo): Promise<Veiculo> {
        return this.veiculoService.update(veiculo);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.veiculoService.delete(id);
    }

}