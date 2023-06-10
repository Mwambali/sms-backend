// course-enrollment.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CourseEnrollment } from '@prisma/client';

@Injectable()
export class CourseEnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CourseEnrollment): Promise<CourseEnrollment> {
    return this.prisma.courseEnrollment.create({ data });
  }

  async findAll(): Promise<CourseEnrollment[]> {
    return this.prisma.courseEnrollment.findMany();
  }

  async findOne(id: number): Promise<CourseEnrollment | null> {
    return this.prisma.courseEnrollment.findUnique({ where: { id } });
  }

  async update(id: number, data: CourseEnrollment): Promise<CourseEnrollment> {
    return this.prisma.courseEnrollment.update({ where: { id }, data });
  }

  async delete(id: number): Promise<CourseEnrollment> {
    return this.prisma.courseEnrollment.delete({ where: { id } });
  }
}

