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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async createWallet(userId) {
        return this.walletService.createWallet(Number(userId));
    }
    async getWalletByUserId(userId) {
        return this.walletService.getWalletByUserId(Number(userId));
    }
    async deposit(userId, amount) {
        return this.walletService.deposit(Number(userId), amount);
    }
    async withdraw(userId, amount) {
        return this.walletService.withdraw(Number(userId), amount);
    }
    async deleteWalletByUserId(userId) {
        return this.walletService.deleteWalletByUserId(Number(userId));
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Post)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletByUserId", null);
__decorate([
    (0, common_1.Put)(':userId/deposit'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deposit", null);
__decorate([
    (0, common_1.Put)(':userId/withdraw'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "withdraw", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deleteWalletByUserId", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallets'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map