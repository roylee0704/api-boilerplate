import { UpdateUserLoginDto } from 'auth/auth.dto';

export class UpdateUserLoginCommand {
    constructor(public readonly input: UpdateUserLoginDto) {}
}
