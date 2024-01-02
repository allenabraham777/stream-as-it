import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '@stream-as-it/health';

import { TwitchGateway } from './stream/twitch.gateway';
import { YoutubeGateway } from './stream/youtube.gateway';

@Module({
    imports: [ConfigModule.forRoot(), HealthModule],
    controllers: [],
    providers: [JwtService, YoutubeGateway, TwitchGateway]
})
export class AppModule {}
