import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User, UserRole } from '@prisma/client'
import { RegisterDto } from './dto/register.dto';
import { RolesGuard } from './guards/roles.guard';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/register-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body(ValidationPipe) userRegister: CreateUserDto,
  ): Promise<User> {
    return await this.authService.registerUser(userRegister)
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Req() user: LoginDto, @Res() response: Response) {

  //   const { token } = await this.authService.login(user);
  //   response.header('Authorization', `Bearer ${token}`);
  //   user.password = undefined;
  //   return response.send(user);
  // }

  @Post('login')
  async login(@Body() user: LoginDto): Promise<{ token: string }> {
    const { token } = await this.authService.login(user);

    return { token }
  }

  //an authenticated route
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  async verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}

