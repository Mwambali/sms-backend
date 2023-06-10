import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Controller('students')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Post('/create')
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get('/')
    getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Patch('/update/:id')
    updateStudent(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
    ) {
        return this.studentService.updateStudent(id, updateStudentDto);
    }

    @Delete('/delete/:id')
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
