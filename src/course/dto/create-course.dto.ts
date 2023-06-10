import { IsString, IsNotEmpty, IsNumber, MinLength, IsArray } from 'class-validator';

// export class CreateCourseDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(200)
//   description: string;

//   @IsNumber()
//   @IsNotEmpty()
//   credits: number;

// }
export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  slug?: string;

  credits?: number;

  students?: string
}

export class UpdateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @IsArray()
  students: string;

  @IsNumber()
  credits: number;

  slug?: string;

}

