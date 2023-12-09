// src/gateways/stream.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import * as ffmpeg from 'fluent-ffmpeg';
import { Server, Socket } from 'socket.io';
import { PassThrough } from 'stream';

@WebSocketGateway({ cors: true })
export class StreamGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private ffmpegProcess: ffmpeg.FfmpegCommand;
  private streamInput = new PassThrough();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.streamInput.end();
    this.ffmpegProcess.kill('SIGINT');
  }

  @SubscribeMessage('streamKey')
  handleStreamKey(client: Socket, payload: { streamKey: string }) {
    console.log('Received stream key:', payload.streamKey);

    this.ffmpegProcess = this.startFFmpegProcess(payload.streamKey);
  }

  @SubscribeMessage('streamData')
  handleStreamData(client: Socket, data: Buffer) {
    console.log('Received stream data:', data);
    if (!this.streamInput.writableEnded) {
      this.streamInput.write(data);
    }
  }

  private startFFmpegProcess(streamKey: string) {
    const ffmpegProcess = ffmpeg()
      .input(this.streamInput)
      .inputFormat('webm')
      .videoCodec('libx264')
      .audioCodec('aac')
      .format('flv')
      .outputOptions(['-preset veryfast', '-g 50'])
      .output(`rtmp://a.rtmp.youtube.com/live2/${streamKey}`)
      .on('start', () => console.log('FFmpeg process started'))
      .on('error', (err) => console.error('FFmpeg error:', err))
      .on('end', () => console.log('FFmpeg process ended'));

    ffmpegProcess.run();

    return ffmpegProcess;
  }
}
