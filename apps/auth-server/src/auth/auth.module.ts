import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@stream-as-it/db';
import { MailService } from '@stream-as-it/email';
import { JwtStrategy } from '@stream-as-it/passport';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, MailService],
})
export class AuthModule {}
