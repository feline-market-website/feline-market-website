import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length:'50'})
    name: string;

    @Column({type:'text'})
    description: string;
}
