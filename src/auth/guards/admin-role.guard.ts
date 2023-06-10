import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { UserService } from "src/users/users.service";

@Injectable()
export class AdminRoleGuard implements CanActivate {
    constructor(private userService: UserService) {}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const { id } = request.user;
            const user = await this.userService.getUserById(id)
            console.log(user);

            return user.role ===  UserRole.ADMIN;

        }

        return false;
    }
}