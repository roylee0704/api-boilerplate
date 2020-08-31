import { AbstractEntity } from '@shared/entities/abstract.entity';

export abstract class User extends AbstractEntity {
    username: string;
}
