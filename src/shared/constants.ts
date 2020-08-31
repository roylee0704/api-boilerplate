/* eslint-disable @typescript-eslint/camelcase */
import { LanguageCode } from './enums';
export declare const SUPER_ADMIN_ROLE_CODE = '__super_admin_role__';

export const CREATE_OMIT_KEYS = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

export const HEADER_ACCEPT_LANGUAGE = 'accept-language';
export const HEADER_CLIENT_TYPE = 'x-client-type';
export const HEADER_CLIENT_VERSION = 'x-client-version';
export const HEADER_DEVICE_NAME = 'x-device-name';
export const HEADER_DEVICE_OS = 'x-device-os';
export const HEADER_DEVICE_ID = 'x-device-id';
export const HEADER_API_VERSION = 'x-api-version';
export const HEADER_TIMEZONE_OFFSET = 'x-timezone-offset';
export const HEADER_OTP_TOKEN = 'x-otp-token';

export const HTTP_STATUS_UPGRADE_REQUIRED = 426;

export const DefinedHttpHeaderKeys = [
    HEADER_ACCEPT_LANGUAGE,
    HEADER_CLIENT_TYPE,
    HEADER_CLIENT_VERSION,
    HEADER_DEVICE_NAME,
    HEADER_DEVICE_OS,
    HEADER_DEVICE_ID,
    HEADER_API_VERSION,
    HEADER_TIMEZONE_OFFSET,
];

export const DEFAULT_LANGUAGE_CODE = LanguageCode.En;

export const DEFAULT_COUNTRY_CODE = 'MY';
