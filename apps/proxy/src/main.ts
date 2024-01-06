import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bodyParser: false });
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    app.useLogger(app.get(Logger));
    await app.listen(PORT || 8005);
}
bootstrap();
