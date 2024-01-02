import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@stream-as-it/dao';

import { UsersRepository } from './user.repository';
import { RefreshStrategy } from './refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({}),
        DatabaseModule,
        DatabaseModule.forFeature()
    ],
    controllers: [],
    providers: [UsersRepository, RefreshStrategy, JwtStrategy]
})
export class PassportStrategyModule {}
