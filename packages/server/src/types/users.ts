import { t } from '../utils/funcs';

export const UserRoles = t({
  user: 'user',
  member: 'member',
  employee: 'employee',
  responsible: 'responsible',
  owner: 'owner',
  admin: 'admin',
});

type UserRoleKeys = keyof typeof UserRoles;
export type UserRole = typeof UserRoles[UserRoleKeys];
