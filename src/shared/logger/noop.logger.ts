import { Logger } from './logger.interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class NoopLogger implements Logger {
    debug(message: string, context?: string): void {
        // noop!
    }

    error(message: string, context?: string, trace?: string): void {
        // noop!
    }

    info(message: string, context?: string): void {
        // noop!
    }

    verbose(message: string, context?: string): void {
        // noop!
    }

    warn(message: string, context?: string): void {
        // noop!
    }
}
