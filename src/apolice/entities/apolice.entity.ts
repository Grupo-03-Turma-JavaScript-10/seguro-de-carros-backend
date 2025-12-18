import { Veiculo } from './../../veiculo/entities/veiculo.entity';
import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity("tb_apolice")
export class Apolice{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 10, nullable: false})
    numeroApolice: string;

    @IsNotEmpty()
    @Column({type:'decimal',precision:10,scale:2,nullable: false})
    valor: number;

    @IsNotEmpty()
    @Column({type:'date',nullable: false})
    dataInicio: Date;

    @IsNotEmpty()
    @Column({type:'date',nullable: false})
    dataFim: Date;

    @ManyToOne(()=>Veiculo,{eager:true})
    @JoinColumn({name:"VeiculoId"})
    veiculo:Veiculo;

    @ManyToOne(()=>Cliente,cliente => cliente.apolices,{eager:true})
    @JoinColumn({name:'ClienteId'})
    cliente:Cliente;


    @BeforeInsert()
    gerarNumero(){
        this.numeroApolice =
          Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
}