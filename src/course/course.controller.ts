import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/create-course.dto';

// @UseGuards(JwtAuthGuard)
// @Roles('admin', 'teacher')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  //create course
  @Post('/create')
  async createCourse(
    @Body() data: Course,
  ): Promise<Course> {
    return this.courseService.createCourse(data);
  }

  //get all courses
  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  //get course
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.getCourse(id);
  }

  //update course
  // @Patch('/update/:id')
  // async update(@Param('id') id: string, @Body() data: Prisma.CourseUpdateInput): Promise<Course> {
  //   return this.courseService.updateCourse(id, data)
  // }

  @Patch('/update/:id')
  async updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  //delete course
  @Delete('/delete/:id')
  async remove(@Param('id') id: string): Promise<Course> {
    return this.courseService.deleteCourse(id);
  }
}

