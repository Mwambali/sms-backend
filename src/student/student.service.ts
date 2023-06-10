import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import slugify from 'slugify';
import { Student } from '@prisma/client';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) { }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { studentName, studentAge, studentCourse, studentClass } = createStudentDto;
        const newSlug = Slugify(studentName);
        const existingStudent = await this.prisma.student.findFirst({
            where: { studentName },
        });

        if (existingStudent) {
            throw new Error('Student already exists');
        }

        const newStudent = await this.prisma.student.create({
            data: {
                studentName,
                slug: newSlug,
                studentAge,
                studentCourse,
                studentClass
            }
        });
        console.log(newStudent);

        return newStudent;
    }

    async getAllStudents() {
        return this.prisma.student.findMany();
    }


    async getCourse(id: string): Promise<Student> {
        const studentId = parseInt(id, 10);

        return this.prisma.student.findUnique({
            where: { id: studentId },
        });
    }


    async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const { studentName, studentAge, studentCourse, studentClass } = updateStudentDto;
        const newSlug = Slugify(studentName);
        const studentId = parseInt(id, 10);

        const updatedStudent = await this.prisma.student.update({
            where: { id: studentId },
            data: {
                studentName,
                studentAge,
                studentCourse,
                studentClass,
                slug: newSlug,
            },
        });

        return updatedStudent;
    }

    async deleteStudent(id: string) {
        const studentId = parseInt(id, 10);
        await this.prisma.student.delete({ where: { id: studentId } });
        return { success: true };
    }

}
function Slugify(input: string): string {
    return slugify(input, {
        lower: true,
        strict: true,
    })
}