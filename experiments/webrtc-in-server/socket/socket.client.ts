// websocket.client.ts
import { Injectable } from '@nestjs/common';
import { connect, Socket } from 'socket.io-client';
import { PeerService } from '../peer/peer.service';

@Injectable()
export class SocketClient {
  private socket: Socket;
  private user: string;
  private remote: string;

  constructor(private peerService: PeerService) {
    this.socket = connect('http://localhost:3002');
    this.setUpListeners();
  }

  private setUpListeners() {
    this.socket.on('user:joined', (data) => {
      console.log('SERVER - user:joined: ', data);
      this.remote = data.id;
      this.socket.emit('server:details', { to: this.remote, id: this.user });
    });
    this.socket.on('user:details', (data) => {
      console.log('SERVER - user:details: ', data);
      this.user = data;
    });
    this.socket.on('get:answer', async (offer) => {
      console.log('SERVER - get:answer: ', offer);
      const _offer = await JSON.parse(offer);
      this.peerService.attachOnTrack(this.onTrack);
      const answer = await this.peerService.getAnswer(_offer);
      this.socket.emit('send:answer', {
        to: this.remote,
        answer: JSON.stringify(answer),
      });
    });
  }

  private onTrack(e: any) {
    const mediaStream = e.streams[0];
    console.log({ mediaStream });
  }

  start() {
    this.socket.emit('room:join', { roomId: 'abc' });
  }
}
