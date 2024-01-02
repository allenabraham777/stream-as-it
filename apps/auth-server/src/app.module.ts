import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '@stream-as-it/pino-logger';
import { HealthModule } from '@stream-as-it/health';

import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, LoggerModule, HealthModule]
})
export class AppModule {}
