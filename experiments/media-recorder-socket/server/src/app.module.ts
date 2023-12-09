import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StreamGateway } from "./socket/socket.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StreamGateway],
})
export class AppModule {}
