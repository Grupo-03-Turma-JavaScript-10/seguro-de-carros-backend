import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Apolice } from '../../apolice/entities/apolice.entity';

@Entity({ name: 'tb_veiculos'})
 export class Veiculo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:255,nullable:false})
    placa:string;

    @Column({length:255,nullable:false})
    modelo:string;

    @Column({length:255,nullable:false})
    marca:string;

    @Column({type:'int',nullable:false})
    ano:number;

    @OneToMany(()=>Apolice,apolice => apolice.veiculo)
    apolices:Apolice[];

    

 }