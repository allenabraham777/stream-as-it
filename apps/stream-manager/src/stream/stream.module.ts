import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '@stream-as-it/passport';
import { PrismaService } from '@stream-as-it/db';

import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [StreamController],
  providers: [StreamService, JwtStrategy, PrismaService],
})
export class StreamModule {}
