import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config'
import { UserService } from '../../users/users.service';
import { JwtRequest } from './jwt-request.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    // private userService: UserService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(request: JwtRequest) => {
        // return request?.cookies?.Authentication;
        return request?.jwt
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { ...payload }; //was .user
  }
  // async validate(id: number) {
  //   return this.userService.getUserById(id);
  //}
  // async validate(payload: any) {
  //   return { 'user': payload.user };
  // }
}
