import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity({ name: 'tb_veiculos'})
 export class Veiculo{
    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({length:255,nullable:false})
    placa:string;
    
    @IsNotEmpty()
    @Column({length:255,nullable:false})
    modelo:string;
    
    @IsNotEmpty()
    @Column({length:255,nullable:false})
    marca:string;
    
    @IsNumber()
    @IsNotEmpty()
    @Column({type:'int',nullable:false})
    ano:number;

 }