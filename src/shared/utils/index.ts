import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { isProdMode } from '../../app.environment';

export const toSafeInteger = (value: string | number, defaultValue: number) => {
    const num = Number(value);
    if (!isNaN(num)) {
        return Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
    } else {
        return defaultValue ? defaultValue : 0;
    }
};

/**
 * Parses in the Nest ExecutionContext of the incoming request, accounting for both
 * GraphQL & REST requests.
 */
export function parseContext(context: ExecutionContext | ArgumentsHost): { req: Request; res: Response } {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    return {
        req,
        res,
    };
}

/**
 * Predicate with type guard, used to filter out null or undefined values
 * in a filter operation.
 */
export function notNullOrUndefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

/**
 * Simple object check.
 * From https://stackoverflow.com/a/34749873/772859
 */
export function isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item);
}

export function isClassInstance(item: any): boolean {
    return isObject(item) && item.constructor.name !== 'Object';
}

/**
 * An extremely fast function for deep-cloning an object which only contains simple
 * values, i.e. primitives, arrays and nested simple objects.
 */
export function simpleDeepClone<T extends string | number | any[] | object>(input: T): T {
    // if not array or object or is null return self
    if (typeof input !== 'object' || input === null) {
        return input;
    }
    let output: any;
    let i: number | string;
    // handle case: array
    if (input instanceof Array) {
        let l;
        output = [] as any[];
        for (i = 0, l = input.length; i < l; i++) {
            output[i] = simpleDeepClone(input[i]);
        }
        return output;
    }
    if (isClassInstance(input)) {
        return input;
    }
    // handle case: object
    output = {};
    for (i in input) {
        if (input.hasOwnProperty(i)) {
            output[i] = simpleDeepClone((input as any)[i]);
        }
    }
    return output;
}

export function isOutdated(minimumVersion: string, actualVersion: string): boolean {
    if (!actualVersion) {
        return isProdMode;
    }

    const minimumVersionArr = minimumVersion.split('.');
    const actualVersionArr = actualVersion.split('.');

    // versionCategory includes 'major', 'minor', 'patch', ex. if semvar
    versionCategoryEnumeration: for (let i = 0; i < minimumVersionArr.length; ++i) {
        const minimumVersionCategoryNum = Number(minimumVersionArr[i]);
        const actualVersionCategoryNum = Number(actualVersionArr[i]);

        // if this is true for any versionCategory, then whole version is out of date
        if (minimumVersionCategoryNum > actualVersionCategoryNum) {
            return true;
        } else if (minimumVersionCategoryNum === actualVersionCategoryNum) {
            continue versionCategoryEnumeration;
        } else {
            break versionCategoryEnumeration;
        }
    }

    return false;
}

export function pick<T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K> {
    return { ...paths.reduce((mem, key) => ({ ...mem, [key]: obj[key] }), {}) } as Pick<T, K>;
}

export * from './password-ciper';
export * from './verification-token-generator';
export * from './formatter';
