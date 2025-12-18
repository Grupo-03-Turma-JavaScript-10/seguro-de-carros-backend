import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";
import { Apolice } from "../../apolice/entities/apolice.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_seguro_de_carros',
            entities: [Veiculo, Apolice],
            synchronize: true,
    };
  }
}