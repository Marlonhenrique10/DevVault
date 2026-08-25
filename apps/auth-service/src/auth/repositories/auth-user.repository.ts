import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthUser } from '../entities/auth-user.entity';

@Injectable()
export class AuthUserRepository {
    constructor(
        @InjectRepository(AuthUser)
        private readonly repository: Repository<AuthUser>,
    ) {}

    async findByEmail(email: string): Promise<AuthUser | null> {
        return this.repository.findOne({
            where: {
                email,
            },
        });
    }

    async findById(id: string): Promise<AuthUser | null> {
        return this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async create(authUser: Partial<AuthUser>): Promise<AuthUser> {
        const newUser = this.repository.create(authUser);

        return this.repository.save(newUser);
    }

}