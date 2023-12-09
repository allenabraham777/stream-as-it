import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeGateway } from './stream/youtube.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, JwtService, YoutubeGateway],
})
export class AppModule {}
