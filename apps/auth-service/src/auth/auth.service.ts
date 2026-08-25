import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthUserRepository } from "./repositories/auth-user.repository";

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

    // async createUser(authUser: Partial<AuthUser>) {
    //     const userExists = await this.authUserRepository.findByEmail(authUser.email);

    //     if (userExists) {
    //         throw new Error('Usuário com este e-mail já existe.')
    //     }
        
    //     return this.authUserRepository.create(authUser);
    // }
}