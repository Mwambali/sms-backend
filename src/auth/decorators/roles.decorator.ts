import { SetMetadata } from "@nestjs/common";

export const hasRoles = (...hasRoles: string[]) => SetMetadata('roles', hasRoles) //key, roles from the arguments