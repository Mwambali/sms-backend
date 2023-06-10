import { Global, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client'
import { UserController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  providers: [UserService, PrismaService, AuthService, PrismaClient, JwtService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
