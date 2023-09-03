import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Maps} from "../maps/maps.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    username: string

    @Column()
    provider: string;

    @Column({nullable: true})
    providerId: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @ManyToMany(() => Maps, {eager: true})
    @JoinTable()
    maps: Maps[]
}