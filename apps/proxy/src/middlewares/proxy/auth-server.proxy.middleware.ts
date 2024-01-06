import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class AuthServerReverseProxyMiddleware implements NestMiddleware {
    protected readonly logger = new Logger(AuthServerReverseProxyMiddleware.name);
    constructor(private readonly configService: ConfigService) {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(req: any, res: any, next: (error?: any) => void) {
        const proxy = createProxyMiddleware({
            target: this.configService.getOrThrow('AUTH_SERVER_URL'),
            pathRewrite: {
                '/api/authentication': '/'
            },
            secure: false,
            changeOrigin: true,
            onProxyReq: (proxyReq, req, _res) => {
                this.logger.log(proxyReq);
                this.logger.log(`Proxying: ${req.method} originally made to ${req.originalUrl}...`);
            }
        });
        proxy(req, res, next);
    }
}
