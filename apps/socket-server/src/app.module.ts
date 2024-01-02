import { Module } from '@nestjs/common';

import { HealthModule } from '@stream-as-it/health';

import { SocketGateway } from './socket/socket.gateway';

@Module({
    imports: [HealthModule],
    providers: [SocketGateway]
})
export class AppModule {}
