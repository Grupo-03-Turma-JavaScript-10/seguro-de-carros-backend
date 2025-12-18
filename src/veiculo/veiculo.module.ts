import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";
import { VeiculoController } from "./controllers/veiculo.controller";
import { VeiculoService } from "./services/veiculo.service";
import { Apolice } from "../apolice/entities/apolice.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo, Apolice])],
    providers: [VeiculoService],
    controllers: [VeiculoController],
    exports: [VeiculoService],
})
export class VeiculoModule{}