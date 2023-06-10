import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test, Prisma } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTestDto): Promise<Test> {
    return this.prisma.test.create({ data });
  }

  async findAll(): Promise<Test[]> {
    return this.prisma.test.findMany();
  }

  async findOneById(id: number): Promise<Test> {
    return this.prisma.test.findUnique({
      where: { id },
      include: {
        results: {
          include: { 
            user: true, 
            test: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Test> {
    return this.prisma.test.delete({
      where: { id },
    });
  }
}
