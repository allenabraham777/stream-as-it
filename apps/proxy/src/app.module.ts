import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@stream-as-it/pino-logger';
import { HealthModule } from '@stream-as-it/health';
import { AuthReverseProxyMiddleware } from 'middlewares/auth-reverse-proxy-middleware';
import { StreamManagerReverseProxyMiddleware } from 'middlewares/stream-manager-reverse-proxy-middleware';
import { StreamServerReverseProxyMiddleware } from 'middlewares/stream-server-reverse-proxy-middleware';

@Module({
    imports: [ConfigModule.forRoot(), LoggerModule, HealthModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthReverseProxyMiddleware)
            .forRoutes({ path: '/api/auth/*', method: RequestMethod.ALL });
        consumer
            .apply(StreamManagerReverseProxyMiddleware)
            .forRoutes({ path: '/api/stream/*', method: RequestMethod.ALL });
        consumer
            .apply(StreamServerReverseProxyMiddleware)
            .forRoutes({ path: '/api/broadcast/*', method: RequestMethod.ALL });
    }
}
