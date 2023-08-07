import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { Class, Prisma } from '@prisma/client';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Post('/create')
    async createClass(@Body() createClassDto: CreateClassDto) {
        return this.classService.createClass(createClassDto);
    }

    @Get()
    async getAllClasses() {
        return this.classService.getAllClasses();
    }

    @Get('/:id')
    getClassById(
        @Param('id') id: string
    ) {
        return this.classService.getClassById(id);
    }

    // @Patch('/update/:slug')
    // async updateClass(@Body() updateClassDto: UpdateClassDto) {
    //     try {
    //         await this.classService.updateClassBySlug(updateClassDto);
    //         return { msg: 'updated' };
    //     } catch (error) {
    //         return { msg: 'Unable to update' };
    //     }
    // }

    @Patch('/update/:id')
    async update(@Param('id') id: string, @Body() data: Prisma.ClassUpdateInput): Promise<Class> {
        return this.classService.updateClassById(id, data)
    }

    @Delete('/delete/:id')
    async deleteClass(@Param('id') id: string) {
        return this.classService.deleteClass(id);
    }
}
