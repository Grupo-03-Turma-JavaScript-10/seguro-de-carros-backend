import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Apolice } from "../entities/apolice.entity";

@Injectable()
export class ApoliceService{
    constructor(private readonly apoliceRepository: Repository<Apolice>){}
}