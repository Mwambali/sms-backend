import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment.service';

@Module({
  controllers: [CourseEnrollmentController],
  providers: [CourseEnrollmentService, PrismaService]
})
export class CourseEnrollmentModule {}
