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





// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { AuthService } from "../auth.service";

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService) { }

//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         if (context.getType() !== 'http') {
//             return false
//         }

//         const authHeader = context.switchToHttp().getRequest().headers[
//             'authorization'
//         ] as string;
//         if (!authHeader) {
//             return false
//         }
//         const authHeaderParts = authHeader.split('');
//         if (authHeaderParts.length !== 2) {
//             return false
//         }
//         const [, jwt] = authHeaderParts

//         return this.authService.verifyJwt(jwt)
//             .then(() => true)
//             .catch(() => false);
//     }

// }