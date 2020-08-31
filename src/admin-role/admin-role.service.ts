import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { AdminRole } from './admin-role.entity';

@Injectable()
export class AdminRoleService extends TypeOrmCrudService<AdminRole> {
    constructor(@InjectRepository(AdminRole) public repository: Repository<AdminRole>) {
        super(repository);
    }
}
