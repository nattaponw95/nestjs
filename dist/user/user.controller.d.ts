import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: Prisma.UserCreateInput): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    getAllUsers(): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
    getUserById(id: string): Promise<{
        wallet: {
            id: number;
            userId: number;
            balance: number;
            version: number;
        };
    } & {
        id: number;
        name: string;
        email: string;
    }>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    deleteUser(id: string): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
}
