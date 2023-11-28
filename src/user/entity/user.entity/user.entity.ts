import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique:true})
    email: string;

    @Column({name : 'first_name', nullable: false})
    firstName: string;

    @Column({name: 'last_name', nullable:false})
    lastName: string;

    @Column({nullable: false})
    avatar: string;

    @Column({name : 'created_at',nullable: false, default: new Date})
    createdAt: Date;

    @Column({name : 'updated_at',nullable: true})
    updatedAt: Date;

    @Column({name : 'deleted_at',nullable: true})
    deletedAt: Date;
}
