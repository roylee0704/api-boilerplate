export class OtpTokenRequestedEvent {
    constructor(public readonly phoneNumber: string, public readonly otpToken: number, public readonly requestCategory: string = null) {}
}
