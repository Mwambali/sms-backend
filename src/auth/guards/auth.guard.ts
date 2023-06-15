import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() !== 'http') {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            return false;
        }

        const authHeaderParts = (authHeader as string).split(' ');

        if (authHeaderParts.length !== 2) {
            throw new UnauthorizedException();
        }

        const [, jwt] = authHeaderParts;

        return from(this.authService.verifyJwt(jwt)).pipe(
            switchMap(({ exp }) => {
                if (!exp) {
                    return of(false);
                }
                console.log(exp);

                const TOKEN_EXP_MS = exp * 1000;
                const isJwtValid = Date.now() < TOKEN_EXP_MS;

                return of(isJwtValid);
            }),
            catchError((error) => {
                console.error('Error during switchMap:', error);

                throw new UnauthorizedException();
            }),
        );
    }
}
