import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    createWallet(userId: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    getWalletByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    deposit(userId: number, amount: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    withdraw(userId: number, amount: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    depositOcc(userId: number, amount: number): Promise<Prisma.BatchPayload>;
    withdrawOcc(userId: number, amount: number): Promise<Prisma.BatchPayload>;
    deleteWalletByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
}
