import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { UserType } from '@shared/enums';

export class AccessToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;

    constructor(accessToken: string, expiresIn: number, refreshToken: string, refreshExpiresIn: number) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.access_token = accessToken;
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.expires_in = expiresIn;
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.refresh_token = refreshToken;
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.refresh_expires_in = refreshExpiresIn;
    }
}

export class LoginCredentialDto {
    @Transform(username => username.toLowerCase())
    username: string;
    password: string;
}

export class ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}

export class ForgetPasswordInput {
    @Transform(username => username.toLowerCase())
    username: string;
}

export class AdminResetPasswordInput {
    password: string;
    token: string;
}

export class ResetPasswordInput {
    password: string;
    otpToken: number;
    phoneNumber: string;
}

export class RequestOtpTokenInput {
    @ApiProperty({
        description: 'The phone number of service provider.',
        example: '60165996794',
    })
    phoneNumber: string;

    requestCategory?: string;
}

export class CreateUserLoginDto {
    userId: string;
    userType: UserType;
    @Transform(username => username.toLowerCase())
    username: string;
    @Transform(secondaryUsername => secondaryUsername.toLowerCase())
    secondaryUsername?: string;
    password: string;
    groups?: string[];
}

export class UpdateUserLoginDto {
    userId: string;
    userType: UserType;
    @Transform(username => username.toLowerCase())
    username: string;
    @Transform(secondaryUsername => secondaryUsername.toLowerCase())
    secondaryUsername?: string;
    password?: string;
    groups?: string[];
}

export class RefreshTokenDto {
    refreshToken: string;
}

export class OtpTokenDto {
    success: boolean;
    otpToken: number;
}
