import { Veiculo } from './../../veiculo/entities/veiculo.entity';
import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=>Veiculo,{eager:true})
    @JoinColumn({name:"VeiculoId"})
    veiculo:Veiculo;


    @BeforeInsert()
    gerarNumero(){
        this.numeroApolice =
          Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
}