import { CreateUserLoginDto } from '../../auth/auth.dto';

export class CreateUserLoginCommand {
    constructor(public readonly input: CreateUserLoginDto) {}
}
