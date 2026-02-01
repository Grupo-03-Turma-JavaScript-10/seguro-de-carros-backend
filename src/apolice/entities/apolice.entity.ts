import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TipoSeguro {
  BASICO = 'BASICO',
  COMPLETO = 'COMPLETO',
  PREMIUM = 'PREMIUM',
}

@Entity("tb_apolice")
export class Apolice {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 10, nullable: false })
  numeroApolice: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;

  @ApiProperty({ required: false })
  @Column({ type: 'date', nullable: true })
  dataInicio: Date;

  @ApiProperty({ required: false })
  @Column({ type: 'date', nullable: true })
  dataFim: Date;

  @ApiProperty({ enum: TipoSeguro, required: false })
  @Column({ type: 'enum', enum: TipoSeguro, nullable: true })
  tipoSeguro: TipoSeguro;

  @ApiProperty({ type: () => Veiculo })
  @ManyToOne(() => Veiculo, veiculo => veiculo.apolices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "VeiculoId" })
  veiculo: Veiculo;

  @ApiProperty({ type: () => Cliente })
  @ManyToOne(() => Cliente, cliente => cliente.apolices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ClienteId' })
  cliente: Cliente;
}
