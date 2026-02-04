// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  // READ ALL
  findAll() {
    return this.prisma.user.findMany();
  }

  // READ ONE
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // UPDATE
  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id); // check exists
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
