import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_apolice")
export class Apolice{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 10, nullable: false})
    numeroApolice: string;

    @IsNotEmpty()
    @Column({nullable: false})
    valor: number;

    @IsNotEmpty()
    @Column({nullable: false})
    dataInicio: Date;

    @IsNotEmpty()
    @Column({nullable: false})
    dataFim: Date;
}