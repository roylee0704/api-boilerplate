import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@shared/config';
import { MockRepository } from '@shared/mocks/mock-repository';
import { SharedModule } from '@shared/shared.module';
import { AdminRole } from '../admin-role/admin-role.entity';
import { AdminUser } from './admin-user.entity';
import { AdminUserService } from './admin-user.service';

describe('AdminUserService', () => {
    let service: AdminUserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SharedModule, AppConfigModule, TypeOrmModule.forFeature([AdminUser, AdminRole]), CqrsModule],
            providers: [AdminUserService],
        })
            .overrideProvider(getRepositoryToken(AdminUser))
            .useValue(new MockRepository<AdminUser>())
            .overrideProvider(getRepositoryToken(AdminRole))
            .useValue(new MockRepository<AdminRole>())
            .compile();

        service = module.get<AdminUserService>(AdminUserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
