import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CourseEnrollment, User, Course } from '.prisma/client';

@Controller('course-enrollments')
export class CourseEnrollmentController {
  constructor(private readonly courseEnrollmentService: CourseEnrollmentService) {}

  @Get()
  async findAll(): Promise<CourseEnrollment[]> {
    return this.courseEnrollmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: CourseEnrollment): Promise<CourseEnrollment> {
    return this.courseEnrollmentService.create(data);
  }

  @Patch()
  async update(@Param('id') id: number , @Body() data: CourseEnrollment): Promise<CourseEnrollment> {
    return this.courseEnrollmentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CourseEnrollment> {
    return this.courseEnrollmentService.delete(Number(id));
  }
}
