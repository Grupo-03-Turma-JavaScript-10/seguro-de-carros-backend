import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Veiculo } from "./entities/veiculo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo])],
    providers: [],
    controllers: [],
    exports: [],
})
export class VeiculoModule{}