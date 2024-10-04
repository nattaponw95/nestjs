import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    return this.userService.createUser(data);
  }

  // Get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Get a user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  // Update a user by ID
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser(Number(id), data);
  }

  // Delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}