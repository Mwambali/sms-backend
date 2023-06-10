import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ClassController],
  providers: [ClassService, PrismaService]
})
export class ClassModule { }
