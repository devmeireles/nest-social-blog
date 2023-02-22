import { SetMetadata } from '@nestjs/common';
import { ERoles } from '../entities/roles.enum';

export const Roles = (roles: ERoles[]) => SetMetadata('roles', roles);
