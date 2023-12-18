import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from '@stream-as-it/db';
import { MailService } from '@stream-as-it/email';
import { JwtStrategy, RefreshStrategy } from '@stream-as-it/passport';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [DbModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RefreshStrategy, MailService]
})
export class AuthModule {}
