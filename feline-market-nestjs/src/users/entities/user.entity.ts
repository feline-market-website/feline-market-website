import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN="admin",
    VENDOR="vendor",
    CUSTOMER="customer",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column({type:"varchar", length:"50", unique: true})
    username: string;
    
    @Column({type:"varchar", length:"100", unique: true})
    email: string;
    
    @Column({type:"varchar", length:"255"})
    password: string;

    @Column({type:"enum", enum:UserRole, default:UserRole.CUSTOMER})
    role: UserRole;
    
    @Column({type:"text", nullable:true})
    avatar_url: string;
    
    @CreateDateColumn({type:"timestamp"})
    created_at: Date;
    
    @UpdateDateColumn({type:"timestamp"})
    created_update: Date;
}
