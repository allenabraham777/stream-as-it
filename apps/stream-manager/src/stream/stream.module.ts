import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { PassportStrategyModule } from '@stream-as-it/passport';
import { DatabaseModule } from '@stream-as-it/dao';

import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { StreamRepository } from './repository/stream.repository';
import { StreamKeyRepository } from './repository/streamKey.repository';

@Module({
    imports: [
        PassportModule,
        DatabaseModule,
        DatabaseModule.forFeature(),
        JwtModule.register({}),
        PassportStrategyModule
    ],
    controllers: [StreamController],
    providers: [StreamService, StreamRepository, StreamKeyRepository]
})
export class StreamModule {}
