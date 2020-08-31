export class LocalizedMessage {
    constructor(public message: string, public variables: { [key: string]: string | number } = {}) {}
}

export const Strings = {
    CannotDeleteRole: (roleName: string) => new LocalizedMessage('CannotDeleteRole', { roleName }),
};
