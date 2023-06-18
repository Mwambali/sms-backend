import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@prisma/client";

export const ROLES_KEY = 'roles'
export const hasRoles = (...hasRoles: UserRole[]) => SetMetadata(ROLES_KEY, hasRoles) //key, roles from the arguments