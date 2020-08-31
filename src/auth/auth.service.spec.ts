import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@shared/config';
import { MockRepository } from '@shared/mocks/mock-repository';
import { PasswordCiper, VerificationTokenGenerator } from '@shared/utils';
import { AdminRole } from '../admin-role/admin-role.entity';
import { AdminUser } from '../admin-user/admin-user.entity';
import { AdminUserModule } from '../admin-user/admin-user.module';
import { AdminUserService } from '../admin-user/admin-user.service';
import { UserLogin } from './auth.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    const adminUserService: any = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule,
                AdminUserModule,
                JwtModule.register({
                    secret: 'SuperSecretKey',
                    signOptions: { expiresIn: '60s' },
                }),
                CqrsModule,
                TypeOrmModule.forFeature([UserLogin]),
            ],
            providers: [AuthService, PasswordCiper, VerificationTokenGenerator],
        })
            .overrideProvider(AdminUserService)
            .useValue(adminUserService)
            .overrideProvider(getRepositoryToken(AdminUser))
            .useValue(new MockRepository<AdminUser>())
            .overrideProvider(getRepositoryToken(UserLogin))
            .useValue(new MockRepository<UserLogin>())
            .overrideProvider(getRepositoryToken(AdminRole))
            .useValue(new MockRepository<AdminRole>())
            .compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
