import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Stream Manager Server')
        .setDescription('Base server API description')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.enableCors();
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT || 8002);
}
bootstrap();
