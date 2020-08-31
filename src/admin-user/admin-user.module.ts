import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from '../admin-role/admin-role.entity';
import { AdminUserController } from './admin-user.controller';
import { AdminUser } from './admin-user.entity';
import { AdminUserService } from './admin-user.service';

@Module({
    controllers: [AdminUserController],
    providers: [AdminUserService],
    imports: [CqrsModule, TypeOrmModule.forFeature([AdminUser, AdminRole])],
    exports: [AdminUserService],
})
export class AdminUserModule {}
