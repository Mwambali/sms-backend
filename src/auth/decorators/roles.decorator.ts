import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export const hasRoles = (...hasRoles: UserRole[]) => SetMetadata('roles', hasRoles) //key, roles from the arguments