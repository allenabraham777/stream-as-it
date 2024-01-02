import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    async validate(payload: { id: number; account_id: number }) {
        const user = await this.userRepository.findOne({
            id: payload.id,
            account_id: payload.account_id
        });
        if (!user) throw new ForbiddenException('Unauthorized');
        const { id, account_id, email } = user;
        return { id, account_id, email };
    }
}
