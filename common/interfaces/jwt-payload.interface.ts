import { UserRole } from '../../common/enums/user-role.enum';

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
