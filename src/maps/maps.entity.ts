import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {classToPlain} from 'class-transformer';
import {User} from "../user/user.entity";

@Entity()
export class Maps extends BaseEntity {
    @PrimaryColumn({type: 'int'})
    id: number

    @Column('json', {
        transformer: {
            to: (value: any) => JSON.stringify(value),
            from: (value: string) => JSON.parse(JSON.stringify(value)),
        },
        nullable: true,
    })
    array: any;

    @Column({
        nullable: true
    })
    city: string

    @Column({nullable: true})
    region: string

    @Column({nullable: true, default: 0})
    amount: number

    @Column({nullable: true, default: false})
    isBuy: boolean

    @Column({nullable: true})
    userId: string

    @OneToMany(type => User, user => user.maps)
    @JoinColumn({name: 'userId'})
    user: User

    toJSON() {
        return classToPlain(this);
    }
}