import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
    @Column({name: 'first_name', nullable: true})
    firstName: string | null;

    @Column({name: 'last_name'})
    lastName: string;

    @Column()
    password: string;

    @Column({name: 'last_logged_in_at'})
    lastLoggedInAt: Date;
}
