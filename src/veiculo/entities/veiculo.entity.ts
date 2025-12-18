import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_veiculos'})
export class Veiculo {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  placa: string;
  
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  modelo: string;
  
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  marca: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  ano: number;

  @ApiProperty({ type: () => [Apolice] })
  @OneToMany(() => Apolice, apolice => apolice.veiculo)
  apolices: Apolice[];

  @ApiProperty({ type: () => Cliente })
  @ManyToOne(() => Cliente, cliente => cliente.veiculos)
  cliente: Cliente;
}
