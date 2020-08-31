import { v4 as uuidv4 } from 'uuid';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { AdminUser } from '../../admin-user/admin-user.entity';
import { GeneralStatus, UserType } from '../../shared/enums';
import { UserLogin } from '../../auth/auth.entity';
import { AdminPermission } from '../../admin-permission/admin-permission.entity';
import { AdminRole } from '../../admin-role/admin-role.entity';

export default class InitialDataSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await this.createSuperAdmin(connection);
        await this.createPermission(connection);
    }

    private async createSuperAdmin(connection: Connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(AdminUser)
            .values([
                {
                    id: '00000000-0000-0000-0000-ef0dd192de7c',
                    name: 'SuperAdmin',
                    emailAddress: 'admin@demo.com',
                    generalStatus: GeneralStatus.ACTIVE,
                },
            ])
            .execute();

        await connection
            .createQueryBuilder()
            .insert()
            .into(UserLogin)
            .values([
                {
                    id: uuidv4(),
                    userType: UserType.ADMIN,
                    userId: '00000000-0000-0000-0000-ef0dd192de7c',
                    username: 'admin@demo.com',
                    passwordHash: '$2b$12$6RFoTGm7w47saerYIFAkQ.wf11/i5pD5iq8hb3yrtsJMPo09mkUWC',
                    isVerified: true,
                    generalStatus: GeneralStatus.ACTIVE,
                },
            ])
            .execute();
    }

    private async createPermission(connection: Connection) {
        await connection
            .createQueryBuilder()
            .insert()
            .into(AdminPermission)
            .values([
                { code: 'users-list', name: 'User List' },
                { code: 'users-create', name: 'Create User' },
                { code: 'users-update', name: 'Update User' },
                { code: 'users-delete', name: 'Delete User' },
                { code: 'roles-list', name: 'Role List' },
            ])
            .execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(AdminRole)
            .values([
                {
                    id: 1,
                    name: 'Super Admin',
                    description: 'User who has god privilege.',
                },
            ])
            .execute();
        const adminUserRepo = connection.getRepository(AdminUser);
        const adminRolesRepo = connection.getRepository(AdminRole);
        const adminPermissionsRepo = connection.getRepository(AdminPermission);
        const permissions = await adminPermissionsRepo.find();
        const admin = await adminUserRepo.findOne({
            id: '00000000-0000-0000-0000-ef0dd192de7c',
        });
        const role = await adminRolesRepo.findOne(1);
        role.permissions = permissions;
        await connection.manager.save(role);
        admin.roles = [role];
        await connection.manager.save(admin);
    }

}
