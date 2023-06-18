import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User, UserRole } from "@prisma/client";
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from "src/users/users.service";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!roles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest();

        // return roles.some((role) => user.role?.includes(role))

        // const user: User = request.user;

        return from(this.userService.getUserById(user.id)).pipe(
            map((user: User) => {
                console.log(user);

                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;
                console.log(hasRole);
                if (hasRole()) {
                    hasPermission = true;
                }
                return user && hasPermission;
            })
        );

        // if (request?.user) {
        //     const { id } = request.user;
        //     const user = this.userService.getUserById(id)

        //     return roles.includes(user.role)

        // }
        //     return false //by default
    }
}