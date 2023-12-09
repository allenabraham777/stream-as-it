import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocketClient } from './socket/socket.client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketClient: SocketClient,
  ) {}

  @Get()
  getHello(): string {
    this.socketClient.start();
    return this.appService.getHello();
  }
}
