import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthUser } from "./entities/auth-user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AuthUser])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}