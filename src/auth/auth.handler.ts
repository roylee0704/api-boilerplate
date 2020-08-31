import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserLoginCommand } from '@cqrs/commands/create-user-login.command';
import { UpdateUserLoginCommand } from '@cqrs/commands/update-user-login.command';
import { AuthService } from './auth.service';

@CommandHandler(CreateUserLoginCommand)
export class CreateUserLoginCommandHandler implements ICommandHandler<CreateUserLoginCommand> {
    constructor(private readonly service: AuthService) { }

    async execute(command: CreateUserLoginCommand): Promise<any> {
        return this.service.createUserLogin(command.input);
    }
}

@CommandHandler(UpdateUserLoginCommand)
export class UpdateUserLoginCommandHandler implements ICommandHandler<UpdateUserLoginCommand> {
    constructor(private readonly service: AuthService) { }

    async execute(command: UpdateUserLoginCommand): Promise<any> {
        return this.service.updateUserLogin(command.input);
    }
}
