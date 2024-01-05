import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useWebSocketAdapter(new IoAdapter(app));
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT || 8004);
}
bootstrap();
