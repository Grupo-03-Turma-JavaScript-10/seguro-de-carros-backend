import { Controller, Get } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";

@Controller("/apolice")
export class ApoliceController{
    constructor(private readonly apoliceService: ApoliceService){
    }

    @Get()
    findAll(){
        return this.apoliceService.findAll();
    }
}