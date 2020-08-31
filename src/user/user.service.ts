import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'roy',
                password: 'ilovegobike',
            },
            {
                userId: 2,
                username: 'parinz1234',
                password: 'ilovegobike',
            }
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
