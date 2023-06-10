import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { TestResultsService } from './test-results.service';
import { TestResult } from '@prisma/client';

@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultsService) {}

  @Post()
  async create(@Body() data: TestResult): Promise<TestResult> {
    return this.testResultService.createTestResult(data);
  }

  @Get()
  async findAll(): Promise<TestResult[]> {
    return this.testResultService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TestResult> {
    return this.testResultService.getTestResult(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: TestResult,
  ): Promise<TestResult> {
    return this.testResultService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.testResultService.deleteTestResult(id);
  }
}

