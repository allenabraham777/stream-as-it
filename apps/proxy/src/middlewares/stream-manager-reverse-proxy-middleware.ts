import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class StreamManagerReverseProxyMiddleware implements NestMiddleware {
    protected readonly logger = new Logger(StreamManagerReverseProxyMiddleware.name);
    private proxy = createProxyMiddleware({
        target: this.configService.getOrThrow('STREAM_MANAGER_SERVER_URL'),
        pathRewrite: {
            '/api/stream': '/'
        },
        secure: false,
        onProxyReq: (proxyReq, req, _res) => {
            this.logger.log(proxyReq);
            this.logger.log(`Proxying: ${req.method} originally made to ${req.originalUrl}...`);
        }
    });
    constructor(private readonly configService: ConfigService) {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(req: any, res: any, next: (error?: any) => void) {
        this.proxy(req, res, next);
    }
}
