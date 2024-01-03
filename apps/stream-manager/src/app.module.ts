import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '@stream-as-it/health';
import { LoggerModule } from '@stream-as-it/pino-logger';

import { StreamModule } from './stream/stream.module';

@Module({
    imports: [StreamModule, ConfigModule.forRoot(), LoggerModule, HealthModule]
})
export class AppModule {}
