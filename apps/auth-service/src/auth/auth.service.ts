import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthUserRepository } from "./repositories/auth-user.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { AuthUserStatus } from "./enums/auth-user-status.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly authUserRepository: AuthUserRepository
    ) {}

    async findUserByEmail(email: string) {
        const user = await this.authUserRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado para esse e-mail.');
        }
        return user;
    }

    async findUserById(id: string) {
        const user = await this.authUserRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado para esse ID.');
        }
        return user;
    }

    async createUser(dto: SignUpDto) {
        const userExists = await this.authUserRepository.findByEmail(dto.email);

        if (userExists) {
            throw new ConflictException('Usuário com este e-mail já existe.')
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);
        
        const user = await this.authUserRepository.create({
            email: dto.email,
            passwordHash,
            status: AuthUserStatus.ACTIVE,
        });

        return {
            id: user.id,
            email: user.email,
            status: user.status,
            createdAt: user.createdAt,
        };
    }
}