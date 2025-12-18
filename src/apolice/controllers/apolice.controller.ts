import { Controller } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";

@Controller("")
export class ApoliceController{
    constructor(private readonly apoliceService: ApoliceService){

    }
}