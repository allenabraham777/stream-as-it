import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { MailService } from '@stream-as-it/email';
import { JwtStrategy, RefreshStrategy } from '@stream-as-it/passport';
import { DatabaseModule } from '@stream-as-it/dao';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './repository/user.repository';
import { AccountRepository } from './repository/account.repository';

@Module({
    imports: [PassportModule, JwtModule.register({}), DatabaseModule, DatabaseModule.forFeature()],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        RefreshStrategy,
        MailService,
        UsersRepository,
        AccountRepository
    ]
})
export class AuthModule {}
