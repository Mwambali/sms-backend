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
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './users.service';
import { CourseEnrollment } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UserController {
  prisma: any;
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

  // @Post('login')
  // async login(@Body() user: User) {
  //   const validatedUser = await this.authService.validateUser(
  //     user.email,
  //     user.password,
  //   );
  //   const loginResult = validatedUser
  //     ? await this.authService.login(validatedUser)
  //     : null;
  //   return loginResult
  // }

  //more routes      
  //get all users

  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  //get user by id
  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  //create user
  @Post('create')
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const user = await this.userService.createUser({ name, email, password });
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

