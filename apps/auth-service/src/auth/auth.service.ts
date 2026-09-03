import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthUserRepository } from "./repositories/auth-user.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { AuthUserStatus } from "./enums/auth-user-status.enum";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly authUserRepository: AuthUserRepository,
        private readonly jwtService: JwtService,
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

    async signIn(dto: SignInDto) {
        const user = await this.authUserRepository.findByEmail(dto.email);

        if(!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

        if(!passwordMatches) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
        return {
            accessToken,
        };
    }
}