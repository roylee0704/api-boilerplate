import { ArgumentsHost, ExceptionFilter, HttpException, Catch, HttpStatus } from '@nestjs/common';
import { LogLevel } from '@shared/logger/logger.interface';
import { LoggerService as Logger } from '@shared/logger/logger.service';
import { parseContext } from '@shared/utils';
import { I18nError } from 'i18n/i18n-error';
import { I18nService } from 'i18n/i18n.service';

/**
 * Logs thrown I18nErrors via configured Logger.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private i18nService: I18nService) {}

    catch(exception: Error | HttpException | I18nError, host: ArgumentsHost) {
        const { req, res } = parseContext(host);

        if (exception instanceof I18nError) {
            const { errorCode, logLevel, statusCode } = exception;
            const localizedError = this.i18nService.translateError(req, exception);
            const logMessage = `${errorCode || 'Error'}: ${localizedError.message}`;
            switch (logLevel) {
                case LogLevel.Error:
                    Logger.error(logMessage, 'ExceptionFilter', exception.stack);
                    break;
                case LogLevel.Warn:
                    Logger.warn(logMessage);
                    break;
                case LogLevel.Info:
                    Logger.log(logMessage);
                    break;
                case LogLevel.Debug:
                    Logger.debug(logMessage);
                    break;
                case LogLevel.Verbose:
                    Logger.verbose(logMessage);
                    break;
            }
            if (res && res.status) {
                res.status(statusCode).json({
                    errorCode,
                    statusCode,
                    message: localizedError.message,
                    timestamp: new Date().toISOString(),
                    path: req.url,
                });
            }
        } else {
            // Assume cast exception (HttpException) to any to get status
            const anyException = exception as any;
            const status = anyException.status || HttpStatus.INTERNAL_SERVER_ERROR;
            let message = exception.message;
            let stack = exception.stack;
            if (status === HttpStatus.NOT_FOUND) {
                message = exception.message;
                stack = undefined;
            }

            Logger.error(message, 'ExceptionFilter', stack);
            //TODO: better handling validation errors
            const errors =
                status === HttpStatus.BAD_REQUEST && anyException.response && Array.isArray(anyException.response.message)
                    ? anyException.response.message
                    : null;
            if (errors) {
                Logger.error(JSON.stringify(errors), 'ExceptionFilter');
            }

            if (res && res.status) {
                res.status(status).json({
                    errorCode: 'NOT_SPECIFIED',
                    statusCode: status,
                    message,
                    errors,
                    timestamp: new Date().toISOString(),
                    path: req.url,
                });
            }
        }
    }
}
