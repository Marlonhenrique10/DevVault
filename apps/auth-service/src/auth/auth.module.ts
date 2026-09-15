import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthUser } from "./entities/auth-user.entity";
import { AuthUserRepository } from "./repositories/auth-user.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthUser]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),

                signOption: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '15m',
                }
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthUserRepository, JwtStrategy],
})
export class AuthModule {}