/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) =>
    SetMetadata('roles', roles);


//its like a sticky note to the route handler or controller
//here ,RoleGuard step in ,reads the sticky note and left by your @Roles decorator