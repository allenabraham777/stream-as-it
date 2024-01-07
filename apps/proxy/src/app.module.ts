import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@stream-as-it/pino-logger';
import { HealthModule } from '@stream-as-it/health';
import { AuthServerReverseProxyMiddleware } from 'middlewares/proxy/auth-server.proxy.middleware';
import { StreamManagerReverseProxyMiddleware } from 'middlewares/proxy/stream-manager.proxy.middleware';
import { StreamServerReverseProxyMiddleware } from 'middlewares/proxy/stream-server.proxy.middleware';
import { AppClientReverseProxyMiddleware } from 'middlewares/proxy/app-client.proxy.middleware';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot(),
        LoggerModule,
        HealthModule,
        RouterModule.register([{ path: 'health', module: HealthModule }])
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthServerReverseProxyMiddleware)
            .forRoutes({ path: '/api/authentication/*', method: RequestMethod.ALL });
        consumer
            .apply(StreamManagerReverseProxyMiddleware)
            .forRoutes({ path: '/api/stream/*', method: RequestMethod.ALL });
        consumer
            .apply(StreamServerReverseProxyMiddleware)
            .forRoutes({ path: '/socket*', method: RequestMethod.ALL });
        consumer
            .apply(AppClientReverseProxyMiddleware)
            .exclude('/health')
            .forRoutes({ path: '/*', method: RequestMethod.ALL });
    }
}
