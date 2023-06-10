import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/users/users.service";
//review
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        console.log('roles', roles);

        const request = context.switchToHttp().getRequest();
        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.getUserById(id)
            console.log(user);

            return roles.includes(user.role)

        }


        return false //by default
    }
}
/*
we created a guard(this guard) that is going to fetch metadata from the custom decorator(roles.decorator) we created too
amitav roy
*/