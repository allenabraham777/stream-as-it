import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '@stream-as-it/health';

import { StreamModule } from './stream/stream.module';

@Module({
    imports: [StreamModule, ConfigModule.forRoot(), HealthModule]
})
export class AppModule {}
