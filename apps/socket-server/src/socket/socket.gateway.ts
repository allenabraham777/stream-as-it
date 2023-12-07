// socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    client.on('join-room', (roomId, userId) => {
      client.join(roomId);
      client.to(roomId).emit('user-connected', userId);

      client.on('disconnect', () => {
        client.to(roomId).emit('user-disconnected', userId);
      });
    });
  }
}
