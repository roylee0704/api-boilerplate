import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import {
    AWSCredentials,
    AppConfig,
    AssetOptions,
    AuthOptions,
} from '@shared/interfaces';
import { DefaultLogger } from '@shared/logger/default.logger';
import { Logger as AppLogger, LogLevel } from '@shared/logger/logger.interface';
import { SnakeNamingStrategy } from '@shared/typeorm/snake-naming-strategy';
import { isDevMode, environment } from '../../app.environment';
import { LanguageCode } from '../enums';
import { DefaultConfiguration } from './default-config';

@Injectable()
export class AppConfigService implements AppConfig {
    private activeConfig: AppConfig;
    constructor(private configService: ConfigService) {
        this.activeConfig = Object.assign(DefaultConfiguration, {
            authOptions: {
                jwtSecretKey: this.configService.get('JWT_SECRET_KEY'),
                jwtTokenExpirationTime: configService.get<number>('JWT_TOKEN_EXPIRATION_TIME'),
                jwtRefreshTokenExpirationTime: DefaultConfiguration.authOptions.jwtTokenExpirationTime,
                verificationTokenDuration: DefaultConfiguration.authOptions.verificationTokenDuration,
            },
        } as AppConfig);
    }

    get nodeEnv(): string {
        return environment;
    }

    get appKey(): string {
        return this.activeConfig.appKey;
    }

    get apiBasePath(): string {
        return this.configService.get<string>('API_BASE_PATH') || this.activeConfig.apiBasePath;
    }

    get adminBaseUrl(): string {
        return this.configService.get<string>('ADMIN_BASE_URL');
    }

    get port(): number {
        return this.configService.get<number>('PORT') || this.activeConfig.port;
    }

    get authOptions(): AuthOptions {
        return this.activeConfig.authOptions;
    }

    get cors(): CorsOptions {
        return this.activeConfig.cors;
    }

    get dbConnectionOption(): ConnectionOptions {
        return {
            ...this.activeConfig.dbConnectionOption,
            type: 'postgres',
            host: this.get<string>('DB_HOST'),
            port: this.get<number>('DB_PORT'),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get<string>('DB_DATABASE'),
            entities: [path.join(__dirname + '/../../**/*.entity{.ts,.js}')],
            migrations: [path.join(__dirname + '/../../database/migrations/*{.ts,.js}')],
            migrationsRun: isDevMode,
            logging: this.get<string>('DB_LOGGING') === 'true',
            synchronize: this.get<string>('DB_SYNCHRONIZE') === 'true',
            subscribers: [],
            namingStrategy: new SnakeNamingStrategy(),
        };
    }

    get defaultLanguageCode(): LanguageCode {
        return this.activeConfig.defaultLanguageCode;
    }

    get defaultLogLevel(): LogLevel {
        return (+process.env.DEFAULT_LOG_LEVEL as LogLevel) ?? this.activeConfig.defaultLogLevel;
    }

    get logger(): AppLogger {
        return new DefaultLogger({ level: this.defaultLogLevel });
    }

    get current(): AppConfig {
        return this.activeConfig;
    }

    get awsCredentials(): AWSCredentials {
        return {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        };
    }


    get assetOptions(): AssetOptions {
        return {
            s3Bucket: process.env.AWS_S3_BUCKET,
            expiresIn: Number(process.env.AWS_S3_LINK_EXPIRES_IN || 60 * 5),
            cdnUrl: process.env.AWS_S3_CDN_URL,
        };
    }


    get timezoneOffset(): number {
        return +process.env.TIMEZONE_OFFSET || this.activeConfig.timezoneOffset;
    }


    get<T = any>(propertyPath: string, defaultValue?: T): T | undefined {
        return this.configService.get<T>(propertyPath, defaultValue);
    }
}
