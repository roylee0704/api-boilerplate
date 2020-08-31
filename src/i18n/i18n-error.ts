import { HttpException, HttpStatus } from '@nestjs/common';
import { LogLevel } from '@shared/logger/logger.interface';

/**
 * @description
 * All errors thrown in the server must use or extend this error class. This allows the
 * error message to be translated before being served to the client.
 *
 * The error messages should be provided in the form of a string key which corresponds to
 * a key defined in the `i18n/locales/<languageCode>.json` files.
 *
 * Note that this class should not be directly used in code, but should be extended by
 * a more specific Error class.
 *
 * @docsCategory errors
 */
export abstract class I18nError extends HttpException {
    protected constructor(
        public message: string,
        public variables: { [key: string]: string | number } = {},
        public errorCode?: string,
        public logLevel: LogLevel = LogLevel.Warn,
        public statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        super({ message, variables, errorCode, logLevel }, statusCode);
    }
}
