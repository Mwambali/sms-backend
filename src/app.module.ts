import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestModule } from './tests/test.module';
import { ConfigModule } from '@nestjs/config';
import { CourseEnrollmentModule } from './course-enrollment/course-enrollment.module';
import { TestResultsModule } from './test-results/test-results.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    PrismaModule,
    TestModule, CourseEnrollmentModule, TestResultsModule, ClassModule, StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
