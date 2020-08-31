import { LanguageCode } from '../enums';

/**
 * This type should be used in any interfaces where the value is to be
 * localized into different languages.
 */
export type LocaleString = string & { _opaqueType: 'LocaleString' };

export type TranslatableKeys<T> = { [K in keyof T]: T[K] extends LocaleString ? K : never }[keyof T];

/**
 * Translations of localizable entities should implement this type.
 */
export type Translation<T> =
    // Translation must include the languageCode and a reference to the base Translatable entity it is associated with
    {
        id: string;
        languageCode: LanguageCode;
    } &
    // Translation must include all translatable keys as a string type
    { [K in TranslatableKeys<T>]: string; }
