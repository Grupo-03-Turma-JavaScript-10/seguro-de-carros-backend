import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

 }