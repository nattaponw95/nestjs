import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Wallet } from '@prisma/client';
// import { Prisma } from '@prisma/client';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }

    // Create a wallet for a user
    async createWallet(userId: number) {
        return this.prisma.wallet.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                balance: 0.0, // Default balance
            },
        });
    }

    // Get a wallet by user ID
    async getWalletByUserId(userId: number) {
        return this.prisma.wallet.findUnique({
            where: { userId },
        });
    }

    async deposit(userId: number, amount: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Lock the wallet row using `FOR UPDATE` to prevent other transactions from modifying it
            const wallet = await prisma.$queryRaw<Wallet[]>(
                Prisma.sql`SELECT * FROM Wallet WHERE userId = ${userId} FOR UPDATE`
            );

            if (!wallet || wallet.length === 0) {
                throw new Error(`Wallet for user ${userId} not found`);
            }

            console.log(new Date().toISOString(), wallet)

            const newBalance = wallet[0].balance + amount;

            // Simulate a delay for testing race conditions
            await sleep(4000); // 3 seconds delay (for testing)

            // Update wallet balance
            return prisma.wallet.update({
                where: { userId },
                data: { balance: newBalance },
            });
        });
    }

    // Withdraw from wallet with row locking (FOR UPDATE)
    async withdraw(userId: number, amount: number) {
        return this.prisma.$transaction(async (prisma) => {
            const wallet = await prisma.$queryRaw<Wallet[]>(
                Prisma.sql`SELECT * FROM Wallet WHERE userId = ${userId} FOR UPDATE`
            );

            if (!wallet || wallet.length === 0) {
                throw new Error(`Wallet for user ${userId} not found`);
            }

            if (wallet[0].balance < amount) {
                throw new Error(`Insufficient balance. Current balance: ${wallet[0].balance}`);
            }

            console.log(new Date().toISOString(), wallet)

            // Subtract the amount from the balance
            const newBalance = wallet[0].balance - amount;

            // await sleep(3000); // long time process before update

            // Update wallet balance
            return prisma.wallet.update({
                where: { userId },
                data: { balance: newBalance },
            });
        });
    }

    async depositOcc(userId: number, amount: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Fetch wallet and include the version for optimistic concurrency control
            const wallet = await prisma.wallet.findUnique({
                where: { userId },
                select: { id: true, balance: true, version: true }
            });

            const newBalance = wallet.balance + amount;

            // Update wallet balance and increment the version
            const updatedWallet = await prisma.wallet.updateMany({
                where: {
                    id: wallet.id,
                    version: wallet.version,  // Ensure the version hasn't changed since it was read
                },
                data: {
                    balance: newBalance,
                    version: { increment: 1 },  // Increment version to reflect the change
                },
            });

            if (updatedWallet.count === 0) {
                throw new Error('Failed to update wallet due to a concurrent transaction. Please retry.');
            }

            return updatedWallet;
        });
    }

    async withdrawOcc(userId: number, amount: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Fetch wallet and include the version for optimistic concurrency control
            const wallet = await prisma.wallet.findUnique({
                where: { userId },
                select: { id: true, balance: true, version: true }
            });

            if (wallet.balance < amount) {
                throw new Error(`Insufficient balance. Current balance: ${wallet.balance}`);
            }

            const newBalance = wallet.balance - amount;

            // Update wallet balance and increment the version
            const updatedWallet = await prisma.wallet.updateMany({
                where: {
                    id: wallet.id,
                    version: wallet.version,  // Ensure the version hasn't changed since it was read
                },
                data: {
                    balance: newBalance,
                    version: { increment: 1 },  // Increment version to reflect the change
                },
            });

            if (updatedWallet.count === 0) {
                throw new Error('Failed to update wallet due to a concurrent transaction. Please retry.');
            }

            return updatedWallet;
        });
    }

    // Delete a wallet by user ID
    async deleteWalletByUserId(userId: number) {
        return this.prisma.wallet.delete({
            where: { userId },
        });
    }
}