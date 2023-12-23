```typescript
import { Controller, Sse, Param, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
    constructor(private readonly youtubeService: YoutubeService) {}

    @Sse('live-chat/:videoId')
    liveChat(@Param('videoId') videoId: string): Observable<MessageEvent> {
        return this.youtubeService.getLiveChatId(videoId).pipe(
            switchMap((liveChatId) => this.youtubeService.listenToChat(liveChatId)),
            map((chatMessage) => ({ data: chatMessage }))
        );
    }
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { YouTubeLiveChat } from 'youtube-live-chat-ts';

@Injectable()
export class YoutubeService {
    private handler: YouTubeLiveChat;

    constructor() {
        this.handler = new YouTubeLiveChat(process.env.YOUTUBE_API_KEY);
    }

    async getLiveChatId(videoId: string): Promise<string> {
        return await this.handler.getLiveChatIdFromVideoId(videoId);
    }

    listenToChat(liveChatId: string) {
        return this.handler.listen(liveChatId);
    }
}
```

```typescript
import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    ConnectedSocket,
    MessageBody
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { YoutubeService } from './youtube.service';

@WebSocketGateway()
export class YoutubeGateway {
    @WebSocketServer() server: Server;

    constructor(private youtubeService: YoutubeService) {}

    @SubscribeMessage('listenChat')
    async handleChatListen(@MessageBody() videoId: string, @ConnectedSocket() client: Socket) {
        const liveChatId = await this.youtubeService.getLiveChatId(videoId);
        this.youtubeService.listenToChat(liveChatId).subscribe({
            next: (chatMessage) => {
                client.emit('chatMessage', chatMessage);
            },
            error: (err) => {
                client.emit('error', err.message);
            }
        });
    }
}
```
