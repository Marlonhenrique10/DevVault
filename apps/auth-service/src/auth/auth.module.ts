import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthUser } from "./entities/auth-user.entity";
import { AuthUserRepository } from "./repositories/auth-user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AuthUser])],
    controllers: [AuthController],
    providers: [AuthService, AuthUserRepository],
})
export class AuthModule {}