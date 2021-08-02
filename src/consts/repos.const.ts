import { UserRepository } from '../modules/users/repos/user.repo';
import { PermissionRepository } from '../repos/permission.repo';
import { RoleRepository } from '../repos/roles.repo';

export const REPOS = [PermissionRepository, RoleRepository, UserRepository];
