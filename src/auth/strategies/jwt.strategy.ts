import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '@shared/config';
import { AccessTokenPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: AppConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.authOptions.jwtSecretKey,
        });
    }

    async validate(payload: any): Promise<AccessTokenPayload> {
        const { sub, aud, username, name } = payload;
        return { sub, aud, username, name };
    }
}
