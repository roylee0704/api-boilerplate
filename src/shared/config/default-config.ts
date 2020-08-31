import { LanguageCode } from '@shared/enums';
import { AppConfig } from '@shared/interfaces';
import { DefaultLogger } from '@shared/logger/default.logger';
import { LogLevel } from '@shared/logger/logger.interface';

export const DefaultConfiguration: AppConfig = {
    appKey: 'SuperSecretKey',
    port: 3000,
    apiBasePath: '/api',
    authOptions: {
        jwtSecretKey: 'SuperSecretKey',
        jwtTokenExpirationTime: '30 days',
        jwtRefreshTokenExpirationTime: '180 days',
        verificationTokenDuration: '7d',
    },
    cors: {
        origin: true,
        credentials: true,
        exposedHeaders: 'x-pagination-page-count,x-pagination-total,x-pagination-page,x-pagination-count',
    },
    dbConnectionOption: {
        type: 'postgres',
    },
    defaultLanguageCode: LanguageCode.En,
    defaultLogLevel: LogLevel.Info,
    logger: new DefaultLogger(),
    timezoneOffset: 7,
};
