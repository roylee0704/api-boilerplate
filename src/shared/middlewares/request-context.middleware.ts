import { Injectable, NestMiddleware, HttpException, Logger } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { AppConfigService } from '../config';
import { HEADER_CLIENT_VERSION, HTTP_STATUS_UPGRADE_REQUIRED, HEADER_ACCEPT_LANGUAGE, HEADER_CLIENT_TYPE, DefinedHttpHeaderKeys } from '../constants';
import { Platform } from '../enums';
import { isOutdated, pick } from '../utils';

export class RequestContext {
    readonly id: number;
    request: Request;
    response: Response;

    constructor(request: Request, response: Response) {
        this.id = Math.random();
        this.request = request;
        this.response = response;
    }

    static currentRequestContext(): RequestContext {
        const session = cls.getNamespace(RequestContext.name);
        if (session && session.active) {
            return session.get(RequestContext.name);
        }

        return null;
    }

    static currentRequest(): Request {
        const requestContext = RequestContext.currentRequestContext();

        if (requestContext) {
            return requestContext.request;
        }

        return null;
    }
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private readonly appConfig: AppConfigService) { }

    use(req: Request, res, next) {
        if (this.appConfig.get('LOGGING_HTTP_HEADER_ENABLED') === 'true') {
            Logger.log(pick(req.headers as any, DefinedHttpHeaderKeys));
        }

        const clientType = String(req.headers[HEADER_CLIENT_TYPE]).toUpperCase();
        if ([Platform.Android.toUpperCase(), Platform.iOS.toUpperCase()].includes(clientType)) {
            const minVersionPerPlatform =
                (clientType === Platform.iOS
                    ? this.appConfig.get<string>('MIN_SUPPORTED_VERSION_IOS')
                    : this.appConfig.get<string>('MIN_SUPPORTED_VERSION_AND')) || '1.0.0';

            if (isOutdated(minVersionPerPlatform, req.headers[HEADER_CLIENT_VERSION])) {
                throw new HttpException('Upgrade Required', HTTP_STATUS_UPGRADE_REQUIRED);
            }
        }

        const acceptLanguage = req.headers[HEADER_ACCEPT_LANGUAGE] as string;
        if (acceptLanguage) {
            switch (acceptLanguage.toLowerCase()) {
                case 'zh-hans':
                    req.headers[HEADER_ACCEPT_LANGUAGE] = 'zh-CN';
                    break;
                case 'zh-hant':
                    req.headers[HEADER_ACCEPT_LANGUAGE] = 'zh-TW';
                    break;
            }
        }

        const requestContext = new RequestContext(req, res);
        const session = cls.getNamespace(RequestContext.name) || cls.createNamespace(RequestContext.name);

        session.run(async () => {
            session.set(RequestContext.name, requestContext);
            next();
        });
    }
}
