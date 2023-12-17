import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitchGateway } from './stream/twitch.gateway';
import { YoutubeGateway } from './stream/youtube.gateway';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, JwtService, YoutubeGateway, TwitchGateway]
})
export class AppModule {}
