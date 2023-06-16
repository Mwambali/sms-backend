import { User } from '@prisma/client';
import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { encodePassword } from './utils/bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Password');
    }
    return user;
  }

  async registerUser(userRegister: CreateUserDto): Promise<User> {
    const hashedPassword = encodePassword(userRegister.password);

    try {
      const createUserDto: CreateUserDto = {
        ...userRegister,
        password: hashedPassword,
      };

      const user = await this.userService.createUser(createUserDto);
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw new InternalServerErrorException('User registration failed');
    }
  }


  async login(loginDto: LoginDto): Promise<{ token: string } | null> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException();
    }
    console.log(jwt);


    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      const { exp } = await this.jwtService.verifyAsync(jwt, { secret });
      console.log(exp);

      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
