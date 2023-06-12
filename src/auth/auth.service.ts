import { User } from '@prisma/client';
import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { encodePassword } from './utils/bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService
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

  async registerUser(
    userRegister: RegisterDto
  ): Promise<User> {
    const hash = encodePassword(userRegister.password)
    console.log(hash);

    try {

      const user = await this.prisma.user.create({
        data: {
          name: userRegister.name,
          email: userRegister.email,
          password: hash,
        },
      });


      delete user.password;
      return await user;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
    }


  };

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
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
