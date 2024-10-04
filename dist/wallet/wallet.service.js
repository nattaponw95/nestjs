"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWallet(userId) {
        return this.prisma.wallet.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                balance: 0.0,
            },
        });
    }
    async getWalletByUserId(userId) {
        return this.prisma.wallet.findUnique({
            where: { userId },
        });
    }
    async deposit(userId, amount) {
        return this.prisma.$transaction(async (prisma) => {
            const wallet = await prisma.$queryRaw(client_1.Prisma.sql `SELECT * FROM Wallet WHERE userId = ${userId} FOR UPDATE`);
            if (!wallet || wallet.length === 0) {
                throw new Error(`Wallet for user ${userId} not found`);
            }
            console.log(new Date().toISOString(), wallet);
            const newBalance = wallet[0].balance + amount;
            await sleep(4000);
            return prisma.wallet.update({
                where: { userId },
                data: { balance: newBalance },
            });
        });
    }
    async withdraw(userId, amount) {
        return this.prisma.$transaction(async (prisma) => {
            const wallet = await prisma.$queryRaw(client_1.Prisma.sql `SELECT * FROM Wallet WHERE userId = ${userId} FOR UPDATE`);
            if (!wallet || wallet.length === 0) {
                throw new Error(`Wallet for user ${userId} not found`);
            }
            if (wallet[0].balance < amount) {
                throw new Error(`Insufficient balance. Current balance: ${wallet[0].balance}`);
            }
            console.log(new Date().toISOString(), wallet);
            const newBalance = wallet[0].balance - amount;
            return prisma.wallet.update({
                where: { userId },
                data: { balance: newBalance },
            });
        });
    }
    async depositOcc(userId, amount) {
        return this.prisma.$transaction(async (prisma) => {
            const wallet = await prisma.wallet.findUnique({
                where: { userId },
                select: { id: true, balance: true, version: true }
            });
            const newBalance = wallet.balance + amount;
            const updatedWallet = await prisma.wallet.updateMany({
                where: {
                    id: wallet.id,
                    version: wallet.version,
                },
                data: {
                    balance: newBalance,
                    version: { increment: 1 },
                },
            });
            if (updatedWallet.count === 0) {
                throw new Error('Failed to update wallet due to a concurrent transaction. Please retry.');
            }
            return updatedWallet;
        });
    }
    async withdrawOcc(userId, amount) {
        return this.prisma.$transaction(async (prisma) => {
            const wallet = await prisma.wallet.findUnique({
                where: { userId },
                select: { id: true, balance: true, version: true }
            });
            if (wallet.balance < amount) {
                throw new Error(`Insufficient balance. Current balance: ${wallet.balance}`);
            }
            const newBalance = wallet.balance - amount;
            const updatedWallet = await prisma.wallet.updateMany({
                where: {
                    id: wallet.id,
                    version: wallet.version,
                },
                data: {
                    balance: newBalance,
                    version: { increment: 1 },
                },
            });
            if (updatedWallet.count === 0) {
                throw new Error('Failed to update wallet due to a concurrent transaction. Please retry.');
            }
            return updatedWallet;
        });
    }
    async deleteWalletByUserId(userId) {
        return this.prisma.wallet.delete({
            where: { userId },
        });
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map