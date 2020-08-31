import { Transform } from 'class-transformer';
import { IsEmail, Length, IsDefined } from 'class-validator';
import { Entity, DeepPartial, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@shared/entities/abstract.entity';
import { GeneralStatus } from '@shared/enums/general-status';
import { AdminRole } from '../admin-role/admin-role.entity';
@Entity()
export class AdminUser extends AbstractEntity {
    constructor(input?: DeepPartial<AdminUser>) {
        super(input);
    }

    @Column()
    @Length(4, 100)
    @IsDefined({ always: true })
    name: string;

    @Column({ unique: true })
    @IsEmail()
    @IsDefined({ always: true })
    @Transform(emailAddress => emailAddress.toLowerCase())
    emailAddress: string;

    @Column({ nullable: true })
    profilePicture?: string;

    @Column({
        name: 'general_status',
        type: 'enum',
        enum: GeneralStatus,
        default: GeneralStatus.ACTIVE,
    })
    generalStatus: GeneralStatus;

    @ManyToMany(
        () => AdminRole,
        roles => roles.adminUser,
        { cascade: true },
    )
    roles: AdminRole[];
}
