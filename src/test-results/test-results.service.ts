import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TestResult, User, Course, Prisma } from '@prisma/client';

@Injectable()
export class TestResultsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TestResult[]>{
    return this.prisma.testResult.findMany();
  }

  async createTestResult(data: TestResult): Promise<TestResult> {
    const { result, userId, testId } = data;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const test = await this.prisma.test.findUnique({
      where: { id: testId },
    });
    if (!test) throw new Error('Test not found');

    const testResult = await this.prisma.testResult.create({
      data: {
        result,
        user: { connect: { id: userId } },
        test: { connect: { id: testId } },
      },
    });

    return testResult;
  }

  async getTestResultsByUser(userId: number): Promise<TestResult[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const testResults = await this.prisma.testResult.findMany({
      where: { userId },
      include: { 
        test: true, 
        user: true 
      },
    });

    return testResults;
  }

  async update(
    id: number, 
    data: Prisma.TestUpdateInput
    ): Promise<TestResult> {
      return this.prisma.testResult.update({
        where: {id},
        data
      })
  }

  // async getTestResultsByCourse(courseId: number): Promise<TestResult[]> {
  //   const course = await this.prisma.course.findUnique({
  //     where: { id: courseId },
  //   });
  //   if (!course) throw new Error('Course not found');

  //   const testResults = await this.prisma.testResult.findMany({
  //     where: { courseId },
  //     include: { user: true, test: true },
  //   });

  //   return testResults;
  // }

  async getTestResult(id: number): Promise<TestResult> {
    return this.prisma.testResult.findUnique({
      where: { id },
      include: { test: true, user: true },
    });
  }

  async deleteTestResult(id: number): Promise<void> {
    await this.prisma.testResult.delete({
      where: { id },
    });
  }
}
