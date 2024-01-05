import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '@stream-as-it/health';

import { SocketGateway } from './socket/socket.gateway';

@Module({
    imports: [HealthModule, ConfigModule.forRoot()],
    providers: [SocketGateway]
})
export class AppModule {}
