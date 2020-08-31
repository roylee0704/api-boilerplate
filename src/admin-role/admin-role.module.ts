import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPermission } from '../admin-permission/admin-permission.entity';
import { AuthModule } from '../auth/auth.module';
import { AdminRoleController } from './admin-role.controller';
import { AdminRole } from './admin-role.entity';
import { AdminRoleService } from './admin-role.service';

@Module({
    controllers: [AdminRoleController],
    providers: [AdminRoleService, Repository],
    imports: [CqrsModule, TypeOrmModule.forFeature([AdminRole, AdminPermission]), AuthModule],
})
export class AdminRolesModule {}
