import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@shared/entities/abstract.entity';
import { AdminRole } from '../admin-role/admin-role.entity';

@Entity()
export class AdminPermission extends AbstractEntity {
    @Column({ unique: true })
    code: string;

    @Column({ nullable: true })
    name: string;

    @ManyToMany(
        () => AdminRole,
        roles => roles.permissions,
        { cascade: false },
    )
    roles: AdminRole[];
}
