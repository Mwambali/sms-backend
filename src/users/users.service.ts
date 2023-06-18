
import { Injectable, Param } from '@nestjs/common';
import { CourseEnrollment, Prisma, PrismaClient, Test, TestResult, User } from '@prisma/client';
import { CreateUserDto } from './dto/register-user.dto';
import { log } from 'util';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) { }

  async createUser(data: CreateUserDto): Promise<User> {
    const { firstName, lastName, ...userData } = data;
    const name = `${firstName} ${lastName}`;
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        name,
      },
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const userId = parseInt(id, 10);
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    console.log(user);

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }


  async updateUser(
    userId: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id: userId }, data });
  }

  async deleteUser(userId: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  async getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]> {
    return this.prisma.courseEnrollment.findMany({
      where: { courseId },
      include: {
        user: true,
        course: true,
      },
    });
  }

  async getTests(courseId: number): Promise<Test[]> {
    return this.prisma.test.findMany({
      where: { courseId },
      include: { course: true }
    });
  }

  async getTestResults(testId: number): Promise<TestResult[]> {
    return this.prisma.testResult.findMany({
      where: { testId },
      include: { user: true, test: true },
    });
  }

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        tests: true,
        enrollments: true,
      },
    });
  }
}

