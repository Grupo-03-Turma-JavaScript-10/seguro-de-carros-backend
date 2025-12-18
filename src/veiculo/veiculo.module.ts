import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";
import { VeiculoController } from "./controllers/veiculo.controller";
import { VeiculoService } from "./services/veiculo.service";
import { Cliente } from "../cliente/entities/cliente.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo, Cliente])],
    providers: [VeiculoService],
    controllers: [VeiculoController],
    exports: [VeiculoService],
})
export class VeiculoModule {}