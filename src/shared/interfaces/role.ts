import { ID } from '@shared/types';

export interface Role {
    id: ID;
    code: string;
    name: string;
    description: string;
    permissions: string[];
}
