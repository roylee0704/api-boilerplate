import { IsDefined } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { AdminPermission } from '../admin-permission/admin-permission.entity';
import { AdminUser } from '../admin-user/admin-user.entity';
import { AdminRoleDto } from './admin-role.dto';

@Entity()
export class AdminRole {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column()
    @IsDefined({ always: true })
    name: string;

    @Column()
    @IsDefined({ always: false })
    description: string;

    @ManyToMany(
        () => AdminPermission,
        permissions => permissions.roles,
        { cascade: true },
    )
    @JoinTable({
        name: 'admin_roles_permissions',
        joinColumn: {
            name: 'roles_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permissions_id',
            referencedColumnName: 'id',
        },
    })
    permissions: AdminPermission[];

    @ManyToMany(
        () => AdminUser,
        AdminUser => AdminUser.roles,
        { cascade: false },
    )
    @JoinTable()
    adminUser: AdminUser[];

    public toDto(): AdminRoleDto {
        const dto = new AdminRoleDto();
        dto.id = this.id;
        dto.name = this.name;
        dto.description = this.description;

        let permStr;
        if (this.permissions !== undefined) {
            permStr = this.permissions.map(permission => {
                return permission.code;
            });
        } else {
            permStr = [];
        }
        dto.permissions = permStr;
        return dto;
    }
}
