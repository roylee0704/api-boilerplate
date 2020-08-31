import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository, In } from 'typeorm';
import { CreateUserLoginCommand } from '@cqrs/commands/create-user-login.command';
import { UpdateUserLoginCommand } from '@cqrs/commands/update-user-login.command';
import { UserType } from '@shared/enums';
import { AdminRole } from '../admin-role/admin-role.entity';
import { CreateAdminUserDto, UpdateAdminUserDto } from './admin-user.dto';
import { AdminUser } from './admin-user.entity';

@Injectable()
export class AdminUserService extends TypeOrmCrudService<AdminUser> {
    constructor(
        @InjectRepository(AdminUser) private readonly repository: Repository<AdminUser>,
        @InjectRepository(AdminRole) private readonly roleRepository: Repository<AdminRole>,
        private commandBus: CommandBus,
    ) {
        super(repository);
    }

    async createOne(req: CrudRequest, dto: CreateAdminUserDto): Promise<AdminUser> {
        const user = this.repository.create(dto);
        const result = await this.repository.save(user);

        await this.commandBus.execute(
            new CreateUserLoginCommand({
                userId: result.id,
                userType: UserType.ADMIN,
                username: dto.emailAddress,
                password: dto.password,
            }),
        );

        return result;
    }

    async overrideReplaceOne(req: CrudRequest, dto: UpdateAdminUserDto): Promise<AdminUser> {
        const result = await this.replaceOne(req, dto);

        await this.commandBus.execute(
            new UpdateUserLoginCommand({
                userId: result.id,
                userType: UserType.ADMIN,
                username: dto.emailAddress,
                password: dto.password,
            }),
        );

        return result;
    }

    async getPermissions(id: string): Promise<any> {
        const user = await this.repository.findOne({
            where: { id },
            relations: ['roles'],
        });
        const permissions = this.getRolesPermission(user.roles);
        return permissions;
    }

    async getRolesPermission(roles: AdminRole[]): Promise<any> {
        const rolesIds = roles.map(role => {
            return role.id;
        });
        if (rolesIds.length === 0) {
            return [];
        }
        const rolesPermissions = await this.roleRepository.find({
            where: {
                id: In(rolesIds),
            },
            relations: ['permissions'],
        });
        const permissions = [];
        rolesPermissions.forEach(role => {
            role.permissions.forEach(permission => {
                const containsPerm = permissions.filter(perm => perm.id === permission.id);
                if (containsPerm.length === 0) {
                    permissions.push(permission);
                }
            });
        });
        return permissions;
    }
}
