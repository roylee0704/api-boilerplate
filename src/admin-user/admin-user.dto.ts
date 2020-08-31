import { Length, IsOptional } from 'class-validator';
import { AdminUser } from './admin-user.entity';

export class CreateAdminUserDto extends AdminUser {
    @Length(5)
    password: string;
}

export class UpdateAdminUserDto extends AdminUser {
    @IsOptional()
    @Length(5)
    password?: string;
}
