import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";
import { ApoliceController } from "./controllers/apolice.controller";
import { VeiculoModule } from "../veiculo/veiculo.module";
import { Veiculo } from "../veiculo/entities/veiculo.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Apolice,Veiculo]),],
    controllers: [ApoliceController],
    providers: [ApoliceService],
    exports: [ApoliceService,
        TypeOrmModule.forFeature([Apolice]),
    ]
})

export class ApoliceModule{} 