import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Apolice])],
    controllers: [],
    providers: [],
    exports: []
})

export class ApoliceModule{} 