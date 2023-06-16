import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@prisma/client";
import { UserService } from "src/users/users.service";
//review
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.getUserById(id)
            console.log(user);

            return roles.includes(user.role)

        }
        return true //by default
    }
}