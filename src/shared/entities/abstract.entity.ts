import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeepPartial, DeleteDateColumn } from 'typeorm';
export abstract class AbstractEntity {
    public constructor(input?: DeepPartial<AbstractEntity>) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                (this as any)[key] = value;
            }
        }
    }

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @DeleteDateColumn()
    @Exclude()
    @ApiHideProperty()
    deletedAt: Date;
}
