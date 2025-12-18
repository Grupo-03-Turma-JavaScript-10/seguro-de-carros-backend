import { IsEmail,IsNotEmpty, MinLength, } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";

@Entity({name:'tb_cliente'})

export class Cliente{
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column({length:255,nullable:false})
  nome:string;

  @IsNotEmpty()
  @IsEmail()
  @Column({unique:true})
  email:string;


  @MinLength(8)
  @IsNotEmpty()
  @Column({length:255,nullable:false})
  senha: string;
  
  @IsNotEmpty()
  @Column({length:14,unique:true,nullable:false})
  cpf:string;
  
  @IsNotEmpty()
  @Column({length:20,nullable:false})
  telefone:string;
   

  @OneToMany(() => Apolice, apolice => apolice.cliente)
   apolices: Apolice[];

}