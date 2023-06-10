import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    studentName: string;

    @IsNumber()
    studentAge: number;

    @IsArray()
    studentCourse: string[]; //could be string[] or jsonValue[] 

    @IsString()
    studentClass: string;

}
export class UpdateStudentDto {
    @IsString()
    studentName?: string;

    @IsNumber()
    studentAge?: number;

    @IsArray()
    studentCourse?: string; ////could be string[] or jsonValue[]

    @IsString()
    studentClass?: string;

    slug?: string;

    @IsString()
    id: string;
}
