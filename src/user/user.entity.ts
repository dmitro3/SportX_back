import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column({nullable: true, default: 0})
    balance: number;
}