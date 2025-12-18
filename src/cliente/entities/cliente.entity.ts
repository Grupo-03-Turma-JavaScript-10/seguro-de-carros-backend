import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_cliente' })
export class Cliente {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @ApiProperty()
  @Column({ length: 14, unique: true, nullable: false })
  cpf: string;

  @ApiProperty()
  @Column({ length: 20, nullable: false })
  telefone: string;

  @ApiProperty({ type: () => [Apolice] })
  @OneToMany(() => Apolice, apolice => apolice.cliente)
  apolices: Apolice[];

  @ApiProperty({ type: () => [Veiculo] })
  @OneToMany(() => Veiculo, veiculo => veiculo.cliente)
  veiculos: Veiculo[];
}
