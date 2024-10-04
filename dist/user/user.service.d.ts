import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getUserById(id: number): Promise<{
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
    updateUser(id: number, data: Prisma.UserUpdateInput): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
}
