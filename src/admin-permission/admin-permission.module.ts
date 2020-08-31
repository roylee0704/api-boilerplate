import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPermissionController } from './admin-permission.controller';
import { AdminPermission } from './admin-permission.entity';
import { AdminPermissionService } from './admin-permission.service';

@Module({
    providers: [AdminPermissionService],
    controllers: [AdminPermissionController],
    imports: [CqrsModule, TypeOrmModule.forFeature([AdminPermission])],
})
export class AdminPermissionModule {}
