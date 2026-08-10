import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import envConfig from './config/env/env.config';
import { envSchema } from './config/env/env.schema';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      validationSchema: envSchema,
    }),

    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}