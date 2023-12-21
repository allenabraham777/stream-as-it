import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import * as ffmpeg from 'fluent-ffmpeg';
import { Server, Socket } from 'socket.io';

import { streamingTypes } from '@stream-as-it/constants';
import { PassThrough } from 'stream';

type Users = {
    [key: string]: string;
};

type StreamKeys = {
    [key: string]: {
        [key: string]: string;
    };
};

type FfmpegProcesses = {
    [key: string]: {
        [key: string]: ffmpeg.FfmpegCommand;
    };
};

type StreamInputs = {
    [key: string]: {
        [key: string]: PassThrough;
    };
};

@WebSocketGateway({ cors: true })
export class BaseStreamGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    protected socketServer: Server;
    protected streamKeys: StreamKeys = {};
    protected ffmpegProcesses: FfmpegProcesses = {};
    protected streamInputs: StreamInputs = {};
    protected users: Users = {};

    constructor(private jwtService: JwtService) {}

    async handleConnection(client: Socket) {
        try {
            const token: string = client?.handshake?.query?.token as string;
            if (!token) throw new Error('Access denied');
            const decoded = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            });

            this.users[client.id] = decoded.user_id;
            console.log(
                `Streaming server socket connection established for user: ${decoded.user_id}, account: ${decoded.account_id} as client: ${client.id}`
            );
        } catch (error) {
            console.error(`Error creating connection with ${client.id}. Reason: ${error.message}`);
            this.socketServer.to(client.id).emit('Access Denied');
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.endAll(client);
    }

    @SubscribeMessage('healthcheck')
    healthCheck(client: Socket) {
        client.emit('healthresult', 'healthy');
    }

    @SubscribeMessage('end:all')
    private endAll(client: Socket) {
        Object.keys(streamingTypes.types).forEach((type) => {
            this.endStream(client, type);
            delete this.users[client.id];
        });
    }

    protected setStream(client: Socket, type: string, base_url: string, streamKey: string) {
        this.streamKeys[type][client.id] = streamKey;
        this.streamInputs[type][client.id] = new PassThrough();
        this.ffmpegProcesses[type][client.id] = this.setFFmpegProcess(
            this.streamInputs[type][client.id],
            streamKey,
            base_url,
            type,
            client.id
        );
    }

    protected startStream(client: Socket, type: string) {
        const ffmpegProcess: ffmpeg.FfmpegCommand = this.ffmpegProcesses[type][client.id];
        ffmpegProcess.run();
    }

    protected handleStream(client: Socket, type: string, data: Buffer) {
        const streamInput: PassThrough = this.streamInputs[type][client.id];
        if (streamInput && !streamInput.writableEnded) {
            streamInput.write(data);
        }
    }

    protected endStream(client: Socket, type: string) {
        const ffmpegProcess: ffmpeg.FfmpegCommand = this.ffmpegProcesses[type]?.[client.id];
        const streamInput: PassThrough = this.streamInputs[type]?.[client.id];

        if (ffmpegProcess) {
            ffmpegProcess?.kill('SIGINT');
            delete this.ffmpegProcesses[type][client.id];
        }
        if (streamInput) {
            streamInput?.end();
            delete this.streamInputs[type][client.id];
        }
        if (this.streamKeys[type]?.[client.id]) {
            delete this.streamKeys[type][client.id];
        }
    }

    private setFFmpegProcess(
        streamInput: PassThrough,
        streamKey: string,
        base_url: string,
        type: string,
        clientId: string
    ) {
        const ffmpegProcess = ffmpeg()
            .input(streamInput)
            .inputFormat('webm')
            .videoCodec('libx264')
            .audioCodec('aac')
            .format('flv')
            .outputOptions(['-preset veryfast', '-g 50'])
            .output(`${base_url}${streamKey}`)
            .on('start', () =>
                console.log(`FFmpeg process started for type: ${type} under client: ${clientId}`)
            )
            .on('error', (err) =>
                console.error(`FFmpeg error for type: ${type} under client: ${clientId}:`, err)
            )
            .on('end', () =>
                console.log(`FFmpeg process ended for type: ${type} under client: ${clientId}`)
            );
        return ffmpegProcess;
    }
}
