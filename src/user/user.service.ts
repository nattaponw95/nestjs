import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // Create a new user
  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  // Get all users
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // Get a single user by ID
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        wallet: true,
      },
    });
  }

  // Update a user by ID
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete a user by ID
  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}