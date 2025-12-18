import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";
import { VeiculoController } from "./controllers/veiculo.controller";
import { VeiculoService } from "./services/veiculo.service";
import { ApoliceModule } from "../apolice/apolice.module";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo]),
    forwardRef(()=> ApoliceModule),],
    providers: [VeiculoService],
    controllers: [VeiculoController],
    exports: [VeiculoService],
})
export class VeiculoModule{}