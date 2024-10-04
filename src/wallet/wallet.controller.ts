import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // Create a wallet for a user
  @Post(':userId')
  async createWallet(@Param('userId') userId: string) {
    return this.walletService.createWallet(Number(userId));
  }

  // Get a wallet by user ID
  @Get(':userId')
  async getWalletByUserId(@Param('userId') userId: string) {
    return this.walletService.getWalletByUserId(Number(userId));
  }

  // Deposit to wallet
  @Put(':userId/deposit')
  async deposit(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.walletService.deposit(Number(userId), amount);
  }

  // Withdraw from wallet
  @Put(':userId/withdraw')
  async withdraw(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.walletService.withdraw(Number(userId), amount);
  }

  // Delete wallet by user ID
  @Delete(':userId')
  async deleteWalletByUserId(@Param('userId') userId: string) {
    return this.walletService.deleteWalletByUserId(Number(userId));
  }
}