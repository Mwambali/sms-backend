import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseController } from './course.controller';

@Module({
  providers: [CourseService, PrismaService],
  controllers: [CourseController]
})
export class CourseModule {}


/*
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
})
export class CourseModule {}

*/