import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '@stream-as-it/passport';
import { DbModule } from '@stream-as-it/db';

import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';

@Module({
    imports: [PassportModule, DbModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
    controllers: [StreamController],
    providers: [StreamService, JwtStrategy]
})
export class StreamModule {}
