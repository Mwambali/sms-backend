import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Prisma, Test, TestResult, User } from '.prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './users.service';
import { CourseEnrollment, UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dto/register-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  // @UseGuards(RolesGuard)
  // @Roles('admin', 'teacher')
  // @Post('register')
  // async register(@Body() user: User): Promise<User> {
  //   const createdUser = await this.authService.registerUser(user);
  //   return createdUser;
  // }

  // @hasRoles('ADMIN', 'STUDENT')
  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  //get user by id
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  //create user
  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }


  //delete user by id
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.deleteUser(id)
  }


  //get user by email
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email)
  }

  //update user
  @Patch(':id')
  async updateUser(@Param('id') userId: number, @Body() data: Prisma.UserUpdateInput): Promise<User> {
    return this.userService.updateUser(Number(userId), data)
  }
  //get user course enrollments
  @Get(':id')
  async getUserCourseEnrollments(@Param('id') courseId: number): Promise<CourseEnrollment[]> {
    return this.userService.getCourseEnrollments(courseId)
  }
  //get all tests
  @Get(':id')
  async getTest(@Param('id') courseId: number): Promise<Test[]> {
    return this.userService.getTests(courseId)
  }
  //get all test results
  @Get(':id')
  async getTestResults(@Param('id') testId: number): Promise<TestResult[]> {
    return this.userService.getTestResults(testId)
  }
  //
}

