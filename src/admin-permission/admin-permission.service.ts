import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { AdminPermission } from './admin-permission.entity';

@Injectable()
export class AdminPermissionService extends TypeOrmCrudService<AdminPermission> {
    constructor(@InjectRepository(AdminPermission) private readonly repository: Repository<AdminPermission>) {
        super(repository);
    }
}
