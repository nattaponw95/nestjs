import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(userId: string): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    getWalletByUserId(userId: string): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    deposit(userId: string, amount: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    withdraw(userId: string, amount: number): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
    deleteWalletByUserId(userId: string): Promise<{
        id: number;
        userId: number;
        balance: number;
        version: number;
    }>;
}
