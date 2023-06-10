import { Injectable, UseGuards } from '@nestjs/common';
import { Course, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import slugify from 'slugify';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  async getCourses(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async getCourse(id: string): Promise<Course> {
    const courseId = parseInt(id, 10);

    return this.prisma.course.findUnique({
      where: { id: courseId },
      include: { enrollments: true, tests: true },
    });
  }

  // async createCourse(
  //   data: Course
  // ): Promise<Course> {
  //   return this.prisma.course.create({
  //     data
  //   });
  // }


  async createCourse(create: CreateCourseDto): Promise<Course> {
    const { courseName, credits, students } = create;
    const newSlug = Slugify(courseName)

    const existingCourse = await this.prisma.course.findFirst({
      where: { courseName },
    });
    if (existingCourse) {
      throw new Error('Course already exists');
    }

    const newCourse = await this.prisma.course.create({
      data: {
        courseName,
        slug: newSlug,
        credits,
        courseStudents: students
      }
    });
    console.log(newCourse);

    return newCourse;
  }

  // async updateCourse(
  //   id: string,
  //   data: Prisma.CourseUpdateInput,
  // ): Promise<Course> {
  //   const courseId = parseInt(id, 10);

  //   return this.prisma.course.update({
  //     where: { id: courseId },
  //     data,
  //   });
  // }

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
    const { course_name, students, credits, slug } = updateCourseDto;
    const courseId = parseInt(id, 10);
    const newSlug = slug || Slugify(course_name);

    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        courseName: course_name,
        courseStudents: students,
        credits,
        slug: newSlug
      },
    });

    return { msg: 'updated' };
  }

  async deleteCourse(id: string): Promise<Course | null> {
    const courseId = parseInt(id, 10);

    return this.prisma.course.delete({
      where: { id: courseId },
      include: {
        enrollments: true,
        tests: true
      }
    });
  }
  async enrollStudent(
    id: string,
    studentId: number,
  ): Promise<Course> {
    const courseId = parseInt(id, 10);
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        enrollments: { connect: { id: studentId } }
      }
    });
  }

  async unenrollStudent(
    id: string,
    studentId: number,
  ): Promise<Course> {
    const courseId = parseInt(id, 10);
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        enrollments: { disconnect: { id: studentId } },
      }
    });
  }
}
function Slugify(input: string): string {
  return slugify(input, {
    lower: true,
    strict: true,
  });
}

