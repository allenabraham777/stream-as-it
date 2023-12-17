import { SubscribeMessage } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

import * as constants from '@stream-as-it/constants';
import { BaseStreamGateway } from './base.gateway';

export class YoutubeGateway extends BaseStreamGateway {
    private TYPE: string;
    private BASE_URL: string;

    constructor() {
        super(new JwtService());
        this.TYPE = constants.streamingTypes.types.YOUTUBE;
        this.BASE_URL = constants.streamingTypes.base_urls.YOUTUBE;

        this.streamKeys = {
            ...this.streamKeys,
            [this.TYPE]: {}
        };

        this.streamInputs = {
            ...this.streamInputs,
            [this.TYPE]: {}
        };

        this.ffmpegProcesses = {
            ...this.ffmpegProcesses,
            [this.TYPE]: {}
        };
    }

    @SubscribeMessage('set:youtube')
    setYoutubeStreamKey(client: Socket, payload: { streamKey: string }) {
        console.log(`Client disconnected: ${client.id}`);
        this.setStream(client, this.TYPE, this.BASE_URL, payload.streamKey);
    }

    @SubscribeMessage('start:youtube')
    startYoutubeStream(client: Socket) {
        this.startStream(client, this.TYPE);
    }

    @SubscribeMessage('stream:youtube')
    handleYoutubeStream(client: Socket, data: Buffer) {
        this.handleStream(client, this.TYPE, data);
    }

    @SubscribeMessage('end:youtube')
    stopYoutubeStream(client: Socket) {
        this.endStream(client, this.TYPE);
    }
}
