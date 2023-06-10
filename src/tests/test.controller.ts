import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return this.testService.create(createTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Test> {
    return this.testService.findOneById(Number(id));
  }
}
