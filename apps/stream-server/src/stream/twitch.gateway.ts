import { SubscribeMessage } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

import * as constants from '@stream-as-it/constants';
import { BaseStreamGateway } from './base.gateway';

export class TwitchGateway extends BaseStreamGateway {
  private TYPE: string;

  constructor() {
    super(new JwtService());
    this.TYPE = constants.streamingTypes.types.TWITCH;

    this.streamKeys = {
      ...this.streamKeys,
      [this.TYPE]: {},
    };

    this.streamInputs = {
      ...this.streamInputs,
      [this.TYPE]: {},
    };

    this.ffmpegProcesses = {
      ...this.ffmpegProcesses,
      [this.TYPE]: {},
    };
  }

  @SubscribeMessage('set:twitch')
  setYoutubeStreamKey(
    client: Socket,
    payload: { streamKey: string; baseUrl: string },
  ) {
    console.log(`Client disconnected: ${client.id}`);
    this.setStream(client, this.TYPE, payload.baseUrl, payload.streamKey);
  }

  @SubscribeMessage('start:twitch')
  startYoutubeStream(client: Socket) {
    this.startStream(client, this.TYPE);
  }

  @SubscribeMessage('stream:twitch')
  handleYoutubeStream(client: Socket, data: Buffer) {
    this.handleStream(client, this.TYPE, data);
  }

  @SubscribeMessage('end:twitch')
  stopYoutubeStream(client: Socket) {
    this.endStream(client, this.TYPE);
  }
}
