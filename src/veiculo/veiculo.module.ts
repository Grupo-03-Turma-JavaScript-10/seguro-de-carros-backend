import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";
import { VeiculoController } from "./controllers/veiculo.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo])],
    providers: [],
    controllers: [VeiculoController],
    exports: [],
})
export class VeiculoModule{}