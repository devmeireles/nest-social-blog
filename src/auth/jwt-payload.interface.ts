import { ERoles } from '../entities/roles.enum';

export interface JwtPayload {
  email: string;
  name?: string;
  role: ERoles;
}
