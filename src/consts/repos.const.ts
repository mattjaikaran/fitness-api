import { ExpertiseRepository } from 'src/modules/settings/repositories/expertise.repository';
import { BoxRatesRepository } from '../modules/box/repositories/box-rates.repository';
import { BoxesRepository } from '../modules/box/repositories/box.repository';
import { LocationsRepository } from '../modules/locations/repositories/location.repository';
import { DaysRepository } from '../modules/settings/repositories/days.repository';
import { FeaturesRepository } from '../modules/settings/repositories/features.repository';
import { FloorPlansRepository } from '../modules/settings/repositories/floor-plans.repository';
import { StylesRepository } from '../modules/settings/repositories/styles.repository';
import { TimingsRepository } from '../modules/settings/repositories/timings.repository';
import { UserRepository } from '../modules/users/repos/user.repo';
import { PermissionRepository } from '../repos/permission.repo';
import { RoleRepository } from '../repos/roles.repo';

export const REPOS = [
  PermissionRepository,
  RoleRepository,
  UserRepository,
  LocationsRepository,
  DaysRepository,
  FeaturesRepository,
  FloorPlansRepository,
  StylesRepository,
  TimingsRepository,
  BoxesRepository,
  BoxRatesRepository,
  ExpertiseRepository,
];
