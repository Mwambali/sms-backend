import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestResultDto {
  @IsNotEmpty()
  @IsNumber()
  testId: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
