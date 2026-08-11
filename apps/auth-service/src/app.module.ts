import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import envConfig from './config/env/env.config';
import { envSchema } from './config/env/env.schema';
import databaseConfig from './config/database/env.database';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig, databaseConfig],
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),

        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),

        autoLoadEntities: true,
        synchronize: false,
      })
    }),

    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}