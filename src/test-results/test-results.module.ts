import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TestResultController } from './test-results.controller';
import { TestResultsService } from './test-results.service';

@Module({
  controllers: [TestResultController],
  providers: [TestResultsService, PrismaService]
})
export class TestResultsModule {}
