import { createParamDecorator, ExecutionContext, applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import {
    HEADER_CLIENT_TYPE,
    HEADER_CLIENT_VERSION,
    HEADER_DEVICE_OS,
    HEADER_DEVICE_NAME,
    HEADER_DEVICE_ID,
    HEADER_ACCEPT_LANGUAGE,
    HEADER_TIMEZONE_OFFSET,
    HEADER_API_VERSION,
} from '../constants';
import { SupportedLanguage } from '../enums';

export const CurrentUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user && req.user[data] : req.user;
});

export const CustomApiHeaders = () => {
    return applyDecorators(
        ApiHeader({
            name: HEADER_ACCEPT_LANGUAGE,
            description: `Accept language. Default 'en'. Could be one of ${(Object as any).values(SupportedLanguage)}`,
            required: false,
        }),
        ApiHeader({
            name: HEADER_TIMEZONE_OFFSET,
            description: 'Time zone difference, in minutes from client system settings to UTC. For example: 480 for +8',
            required: false,
        }),
        ApiHeader({
            name: HEADER_CLIENT_TYPE,
            description: 'Client type. Could be one of Android (and), iOS (ios), Web (web)',
            required: false,
        }),
        ApiHeader({
            name: HEADER_CLIENT_VERSION,
            description: 'Client version, eg App Version in semantic version format (1.0.0)',
            required: false,
        }),
        ApiHeader({
            name: HEADER_DEVICE_NAME,
            description: 'Device name',
            required: false,
        }),
        ApiHeader({
            name: HEADER_DEVICE_OS,
            description: 'Device OS',
            required: false,
        }),
        ApiHeader({
            name: HEADER_DEVICE_ID,
            description: 'Device ID',
            required: false,
        }),
        ApiHeader({
            name: HEADER_API_VERSION,
            description: 'API version',
            required: false,
        }),
    );
};

export * from './pagination.decorator';
