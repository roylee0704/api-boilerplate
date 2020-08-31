import { HttpStatus } from '@nestjs/common';
import { CoreEntitiesMap } from '@shared/entities';
import { LogLevel } from '@shared/logger/logger.interface';
import { I18nError } from '../i18n/i18n-error';

/**
 * @description
 * This error should be thrown when some unexpected and exceptional case is encountered.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class InternalServerError extends I18nError {
    constructor(message = 'SomethingWentWrong', variables: { [key: string]: string | number } = {}) {
        super(message, variables, 'INTERNAL_SERVER_ERROR', LogLevel.Error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

/**
 * @description
 * This error should be thrown when user input is not as expected.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class UserInputError extends I18nError {
    constructor(message: string, variables: { [key: string]: string | number } = {}) {
        super(message, variables, 'USER_INPUT_ERROR', LogLevel.Warn);
    }
}

/**
 * @description
 * This error should be thrown when an operation is attempted which is not allowed.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class IllegalOperationError extends I18nError {
    constructor(message: string, variables: { [key: string]: string | number } = {}) {
        super(message, variables, 'ILLEGAL_OPERATION', LogLevel.Warn, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

/**
 * @description
 * This error should be thrown when the user's authentication credentials do not match.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class UnauthorizedError extends I18nError {
    constructor() {
        super('Unauthorized', {}, 'UNAUTHORIZED', LogLevel.Info, HttpStatus.UNAUTHORIZED);
    }
}

export class InvalidCredentials extends I18nError {
    constructor() {
        super('InvalidCredentials', {}, 'INVALID_CREDENTIALS', LogLevel.Info, HttpStatus.BAD_REQUEST);
    }
}

/**
 * @description
 * This error should be thrown when a user attempts to access a resource which is outside of
 * his or her privileges.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class ForbiddenError extends I18nError {
    constructor() {
        super('Forbidden', {}, 'FORBIDDEN', LogLevel.Warn, HttpStatus.FORBIDDEN);
    }
}

/**
 * @description
 * This error should be thrown when an entity cannot be found in the database, i.e. no entity of
 * the given entityName (Product, User etc.) exists with the provided id.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class EntityNotFoundError extends I18nError {
    constructor(entityName: keyof typeof CoreEntitiesMap, id: string | number) {
        super('EntityWithIdNotFound', { entityName: entityName.toLowerCase(), id }, 'ENTITY_NOT_FOUND', LogLevel.Warn, HttpStatus.NOT_FOUND);
    }
}


/**
 * @description
 * This error should be thrown when the verification token (used to verify a Customer's email
 * address) is either invalid or does not match any expected tokens.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class VerificationTokenError extends I18nError {
    constructor() {
        super('VerificationTokenNotRecognized', {}, 'BAD_VERIFICATION_TOKEN', LogLevel.Warn);
    }
}

/**
 * @description
 * This error should be thrown when the verification token (used to verify a Customer's email
 * address) is valid, but has expired according to the `verificationTokenDuration` setting
 * in {@link AuthOptions}.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class VerificationTokenExpiredError extends I18nError {
    constructor() {
        super('VerificationTokenHasExpired', {}, 'EXPIRED_VERIFICATION_TOKEN', LogLevel.Warn);
    }
}

/**
 * @description
 * This error should be thrown when an error occurs trying to reset a Customer's password.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class PasswordResetTokenError extends I18nError {
    constructor() {
        super('PasswordResetTokenNotRecognized', {}, 'BAD_PASSWORD_RESET_TOKEN', LogLevel.Warn);
    }
}

/**
 * @description
 * This error should be thrown when an error occurs trying to reset a Customer's password
 * by reason of the token having expired.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class PasswordResetTokenExpiredError extends I18nError {
    constructor() {
        super('PasswordResetTokenHasExpired', {}, 'EXPIRED_PASSWORD_RESET_TOKEN', LogLevel.Warn);
    }
}


/**
 * @description
 * This error should be thrown when an error occurs when attempting to update a User's identifier
 * (e.g. change email address).
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class IdentifierChangeTokenError extends I18nError {
    constructor() {
        super('identifier-change-token-not-recognized', {}, 'EXPIRED_IDENTIFIER_CHANGE_TOKEN', LogLevel.Warn);
    }
}

/**
 * @description
 * This error should be thrown when the `requireVerification` in {@link AuthOptions} is set to
 * `true` and an unverified user attempts to authenticate.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class NotVerifiedError extends I18nError {
    constructor() {
        super('email-address-not-verified', {}, 'NOT_VERIFIED', LogLevel.Warn);
    }
}

/**
 * @description
 * This error is thrown when the coupon code is not associated with any active Promotion.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class CouponCodeInvalidError extends I18nError {
    constructor(couponCode: string) {
        super('coupon-code-not-valid', { couponCode }, 'COUPON_CODE_INVALID', LogLevel.Verbose);
    }
}

/**
 * @description
 * This error is thrown when the coupon code is associated with a Promotion that has expired.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class CouponCodeExpiredError extends I18nError {
    constructor(couponCode: string) {
        super('coupon-code-expired', { couponCode }, 'COUPON_CODE_EXPIRED', LogLevel.Verbose);
    }
}

/**
 * @description
 * This error is thrown when the coupon code is associated with a Promotion that has expired.
 *
 * @docsCategory errors
 * @docsPage Error Types
 */
export class CouponCodeLimitError extends I18nError {
    constructor(limit: number) {
        super('coupon-code-limit-has-been-reached', { limit }, 'COUPON_CODE_LIMIT_REACHED', LogLevel.Verbose);
    }
}

export class BadRequestError extends I18nError {
    constructor() {
        super('BadRequest', {}, 'BAD_REQUEST', LogLevel.Info, HttpStatus.BAD_REQUEST);
    }
}



export class EmailAddressAlreadyInUsedError extends I18nError {
    constructor(emailAddress: string) {
        super('EmailAddressAlreadyInUsed', { emailAddress }, 'EMAIL_ADDRESS_ALREADY_IN_USED', LogLevel.Warn, HttpStatus.BAD_REQUEST);
    }
}

export class PrimaryPhoneNumberAlreadyInUsedError extends I18nError {
    constructor(phoneNumber: string) {
        super('PrimaryPhoneNumberAlreadyInUsed', { phoneNumber }, 'PRIMARY_PHONE_NUMBER_ALREADY_IN_USED', LogLevel.Warn, HttpStatus.BAD_REQUEST);
    }
}
