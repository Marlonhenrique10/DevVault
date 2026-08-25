import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuthUserStatus } from "../enums/auth-user-status.enum";

@Entity('auth_users')
export class AuthUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        name: 'password_hash',
    })
    passwordHash: string;

    @Column({
        type: 'enum',
        enum: AuthUserStatus,
        default: AuthUserStatus.ACTIVE,
    })
    status: AuthUserStatus;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}