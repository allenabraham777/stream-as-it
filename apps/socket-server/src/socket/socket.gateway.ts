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
    client.on('room:join', ({ roomId, type }) => {
      this.server.to(roomId).emit('user:joined', { id: client.id, type });
      client.join(roomId);
      this.server.to(client.id).emit('user:details', client.id);
      client.on('disconnect', () => {
        client.to(roomId).emit('user:disconnected', client.id);
      });
    });

    client.on('server:details', ({ to, id }) => {
      this.server.to(to).emit('server:details', id);
    });

    client.on('get:answer', ({ to, offer }) => {
      this.server.to(to).emit('get:answer', offer);
    });

    client.on('send:answer', ({ to, answer }) => {
      this.server.to(to).emit('send:answer', answer);
    });

    client.on('start:stream', ({ to }) => {
      this.server.to(to).emit('start:stream');
    });
  }
}
