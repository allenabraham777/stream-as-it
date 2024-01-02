import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from '@stream-as-it/pino-logger';

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, LoggerModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
