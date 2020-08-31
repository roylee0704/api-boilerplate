import chalk from 'chalk';
import { Logger, LogLevel } from './logger.interface';

const DEFAULT_CONTEXT = 'App';

// Reference from https://github.com/vendure-ecommerce/vendure/tree/master/packages/core/src/config/logger/default-logger.ts
export class DefaultLogger implements Logger {
    /** @internal */
    level: LogLevel = LogLevel.Info;
    private readonly timestamp: boolean;
    private defaultContext = DEFAULT_CONTEXT;
    private readonly localeStringOptions = {
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
    };

    constructor(options?: { level?: LogLevel; timestamp?: boolean }) {
        this.level = options && options.level != null ? options.level : LogLevel.Info;
        this.timestamp = options && options.timestamp !== undefined ? options.timestamp : true;
    }

    setDefaultContext(defaultContext: string) {
        this.defaultContext = defaultContext;
    }

    error(message: string, context?: string, trace?: string | undefined): void {
        if (this.level >= LogLevel.Error) {
            this.logMessage(chalk.red('error'), chalk.red(this.ensureString(message) + (trace ? `\n${trace}` : '')), context);
        }
    }
    warn(message: string, context?: string): void {
        if (this.level >= LogLevel.Warn) {
            this.logMessage(chalk.yellow('warn'), chalk.yellow(this.ensureString(message)), context);
        }
    }
    info(message: string, context?: string): void {
        if (this.level >= LogLevel.Info) {
            this.logMessage(chalk.blue('info'), this.ensureString(message), context);
        }
    }
    verbose(message: string, context?: string): void {
        if (this.level >= LogLevel.Verbose) {
            this.logMessage(chalk.magenta('verbose'), this.ensureString(message), context);
        }
    }
    debug(message: string, context?: string): void {
        if (this.level >= LogLevel.Debug) {
            this.logMessage(chalk.magenta('debug'), this.ensureString(message), context);
        }
    }

    private logMessage(prefix: string, message: string, context?: string) {
        process.stdout.write([prefix, this.logTimestamp(), this.logContext(context), message, '\n'].join(' '));
    }

    private logContext(context?: string) {
        return chalk.cyan(`[${context || this.defaultContext}]`);
    }

    private logTimestamp() {
        if (this.timestamp) {
            const timestamp = new Date(Date.now()).toLocaleString(undefined, this.localeStringOptions);
            return chalk.gray(timestamp + ' -');
        } else {
            return '';
        }
    }

    private ensureString(message: string | object | any[]): string {
        return typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    }
}
