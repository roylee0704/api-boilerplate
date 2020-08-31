import { LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from './logger.interface';

const noopLogger: Logger = {
    error() {
        /* */
    },
    warn() {
        /* */
    },
    info() {
        /* */
    },
    verbose() {
        /* */
    },
    debug() {
        /* */
    },
};

export class LoggerService implements NestLoggerService {
    private static _instance: typeof LoggerService = LoggerService;
    private static _logger: Logger;

    static get logger(): Logger {
        return this._logger || noopLogger;
    }

    private get instance(): typeof LoggerService {
        const { _instance } = LoggerService;
        return _instance;
    }

    /** @internal */
    static useLogger(logger: Logger) {
        LoggerService._logger = logger;
    }

    /** @internal */
    error(message: any, trace?: string, context?: string): any {
        this.instance.error(message, context, trace);
    }

    /** @internal */
    warn(message: any, context?: string): any {
        this.instance.warn(message, context);
    }

    /** @internal */
    log(message: any, context?: string): any {
        this.instance.info(message, context);
    }

    /** @internal */
    verbose(message: any, context?: string): any {
        this.instance.verbose(message, context);
    }

    /** @internal */
    debug(message: any, context?: string): any {
        this.instance.debug(message, context);
    }

    static error(message: string, context?: string, trace?: string): void {
        LoggerService.logger.error(message, context, trace);
    }

    static warn(message: string, context?: string): void {
        LoggerService.logger.warn(message, context);
    }

    static info(message: string, context?: string): void {
        LoggerService.logger.info(message, context);
    }

    static verbose(message: string, context?: string): void {
        LoggerService.logger.verbose(message, context);
    }

    static debug(message: string, context?: string): void {
        LoggerService.logger.debug(message, context);
    }

    static log(message: string, context?: string): void {
        LoggerService.logger.info(message, context);
    }
}
