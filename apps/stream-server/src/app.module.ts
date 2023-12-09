import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeerService } from './peer/peer.service';
import { SocketClient } from './socket/socket.client';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketClient, PeerService],
})
export class AppModule {}
