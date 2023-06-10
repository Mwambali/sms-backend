import { Injectable } from '@nestjs/common';
import { Class, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import slugify from 'slugify';

@Injectable()
export class ClassService {
    constructor(private prisma: PrismaService) { }

    async createClass(create: CreateClassDto): Promise<Class> {
        const { className } = create;

        const existingClass = await this.prisma.class.findFirst({
            where: { className },
        });
        if (existingClass) {
            throw new Error('Class already exists');
        }

        const newClass = await this.prisma.class.create({
            data: {
                className: create.className,
                slug: Slugify(create.className)
            },
        });
        console.log(newClass);
        return newClass;

    }

    async getAllClasses(): Promise<Class[]> {
        return this.prisma.class.findMany();
    }

    // async updateClassBySlug(updateClassDto: UpdateClassDto) {
    //     const { name, slug } = updateClassDto;
    //     const newSlug = Slugify(name);
    //     console.log(newSlug);

    //     const updated = await this.prisma.class.update({
    //         where: { 
    //             slug_name: {
    //                 slug
    //             } },
    //         data: { className: name, slug: newSlug },
    //     });
    //     return updated
    // }


    async updateClassById(
        id: string,
        data: Prisma.ClassUpdateInput, //just the name
    ): Promise<Class> {
        const classId = parseInt(id, 10);
        return this.prisma.class.update({
            where: { id: classId },
            data: {
                className: data.className,
            },
        });

    }

    async deleteClass(id: string) {
        const classId = parseInt(id, 10)
        await this.prisma.class.delete({
            where: { id: classId },
        });

        return { success: true };
    }
}

function Slugify(input: string): string {
    return slugify(input, {
        lower: true,
        strict: true,
    });
}

