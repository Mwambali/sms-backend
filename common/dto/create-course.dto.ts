import { UserRole } from '../enums/user-role.enum';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsEnum(UserRole, {
    message: `Invalid role. Role must be one of ${Object.values(UserRole)}`
  })
  @IsNotEmpty()
  teacherRole: UserRole;
}
