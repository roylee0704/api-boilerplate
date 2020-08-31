import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConnectionOptions } from 'typeorm';
import { LanguageCode } from '@shared/enums';
import { Logger, LogLevel } from '@shared/logger/logger.interface';

export interface AuthOptions {
    jwtSecretKey: string;
    jwtTokenExpirationTime: string | number;
    jwtRefreshTokenExpirationTime: string | number;
    verificationTokenDuration: string | number;
}

export interface AWSCredentials {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}

export interface AssetOptions {
    s3Bucket: string;
    expiresIn: number;
    cdnUrl: string;
}

export interface AppConfig {
    /**
     * @description
     * Is a random string stored in APP_KEY to serve as application encryption key.
     *
     */
    appKey: string;
    /**
     * @description
     * API base path, eg: /api
     */
    apiBasePath?: string;
    /**
     * @description
     * Port that application should listen on.
     *
     * @default 3000
     */
    port: number;
    /**
     * @description
     * Configuration for authorization.
     */
    authOptions: AuthOptions;
    /**
     * @description
     * Set the CORS handling for the server. See the [express CORS docs](https://github.com/expressjs/cors#configuration-options).
     *
     * @default { origin: true, credentials: true }
     */
    cors?: CorsOptions;
    /**
     * @description
     * Provide a logging service which implements the {@link Logger} interface.
     *
     * @default DefaultLogger
     */
    logger?: Logger;
    /**
     * @description
     * The connection options used by TypeORM to connect to the database.
     */
    dbConnectionOption: ConnectionOptions;
    /**
     * @description
     * The default languageCode of the app.
     *
     * @default LanguageCode.En
     */
    defaultLanguageCode?: LanguageCode;

    /**
     * @description
     * The configuration for AWS S3 SDK.
     */
    awsCredentials?: AWSCredentials;

    /**
     * @description
     * The configuration for assets.
     */
    assetOptions?: AssetOptions;

    /**
     * @description
     * The configuration for the default logging level.
     */
    defaultLogLevel: LogLevel;

    timezoneOffset: number;
}
